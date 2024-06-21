"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle, BsPeople } from "react-icons/bs";
import { BiSolidGhost } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios.post('/api/register', data)
      .then(() => toast.success('회원가입 완료!'))
      .catch(() => toast.error('회원가입에 실패했습니다. 다시 시도하세요.'))
      .finally(() => setIsLoading(false));
    } 
    
    if (variant === "LOGIN") {
      signIn('credentials', {
        data,
        redirect: false,
      })
      .then((callback) => {
        
        if(callback?.error){
          return toast.error('invalid error')
        }

        if(callback?.ok && !callback?.error){
          return toast.success('logged in!')
        }
      })
      .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social Sign In
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="name" text="이름" register={register} errors={errors} />
          )}
          <Input
            id="email"
            label="email"
            type="text"
            register={register}
            errors={errors}
            text="이메일"
          />
          <Input
            id="password"
            label="password"
            type="password"
            register={register}
            errors={errors}
            text="비밀번호"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "로그인" : "회원가입"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                다른 방법으로 로그인
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} method="Github"  />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} method="Google"  />
            <AuthSocialButton icon={BiSolidGhost} onClick={() => socialAction('guest')} method="Guest"  />
          </div>
          
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === 'LOGIN' ? '처음 오신건가요?' : '이미 계정이 있으신가요?'}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === 'LOGIN' ? '새 계정 만들기' : '로그인하기'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
