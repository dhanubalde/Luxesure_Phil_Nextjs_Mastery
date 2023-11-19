'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
       hover:border-black
        transition
        cursor:pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
        `}
    >
      <Icon size={25} />
      <div className="font-semibold text-[12px]">{label}</div>
    </div>
  );
};

export default CategoryInput;
