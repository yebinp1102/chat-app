import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex bg-gray-100 min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="bg-blue-500 flex items-center justify-center w-16 h-16 rounded-full">
          <Image
            alt="logo"
            height="48"
            width="48"
            src="/images/chatbot.svg"
          />
        </div>

        <h2 className="mt-4 text-center text-2xl font-bold text-blue-400">
          Chat App에 오신 것을 환영합니다!
        </h2>
      </div>

      <AuthForm />

    </div>
  );
}
