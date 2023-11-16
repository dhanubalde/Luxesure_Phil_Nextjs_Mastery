'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosGlobe } from 'react-icons/io';
import Avatar from '@/components/Avatar';
import { useCallback, useState } from 'react';
import MenuItem from '@/components/navbar/MenuItem';
import useResgisterModal from '@/hooks/useRegisterModal';
import useLoginModel from '@/hooks/useLoginModal';

const UserMenu = () => {
  const registerModal = useResgisterModal();
  const loginModal = useLoginModel();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                  hover:bg-neutral-100
                    transition
                    cursor-pointer
                  "
        >
          Airbnb your home
        </div>
        <div className="hidden md:block text-md py-4 px-4 rounded-full items-center md:py-4 md:px-4 cursor-pointer  hover:bg-neutral-100 transition ">
          <IoIosGlobe />
        </div>

        <div
          onClick={toggleOpen}
          className="
                    p-3
                    md:py-[0.5rem]
                    md:px-3 
                    border-[1px] 
                    border-neutral-200
                    flex
                    flex-row
                    item-center
                    gap-4
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition "
        >
          <AiOutlineMenu className="m-1" />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-15 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              <MenuItem onClick={loginModal.onOpen} label="Log in" />
              <MenuItem onClick={() => {}} label="Airbnb Philippines" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
