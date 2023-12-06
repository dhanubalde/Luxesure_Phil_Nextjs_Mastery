'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
          relative 
          disabled:opacity-70
          rounded-md
          hover:opacity-80
          transition
          w-full
          text-[16px]
          font-bold
          ${outline ? 'bg-white' : 'bg-[#20B2D2]'}
          ${outline ? 'border-black' : 'bg-[#20B2D2]'}
          ${outline ? 'text-black' : 'text-white'}
          ${small ? 'py-2' : 'py-3'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'font-regular' : 'font-semiblod'}
          ${small ? 'border-[0.1rem]' : 'border-[0.1rem]'}
          `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
