import { useState } from "react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  method: string
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  method
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="inline-flex w-full h-10 items-center justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    >
      {isHover ? (
        <span className="text-sm">{method}</span>
      ) : (
        <span className="text-xl">{<Icon />}</span>
      )}
    </button>
  );
};

export default AuthSocialButton;
