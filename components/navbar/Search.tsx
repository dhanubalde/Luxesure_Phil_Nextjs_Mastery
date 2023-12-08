'use client';

import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import useSearchModel from '@/hooks/useSearchModal';

const Search = () => {
  const router = useRouter();
  const searchModal = useSearchModel();
  return (
    <div
      onClick={searchModal.onOpen}
      className="

        border-[1px]
        w-full
        md:w-auto
        py-[0.3rem]
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        "
    >
      <div className=" flex flex-row items-center justify-between ">
        <div className="text-[13px] font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block border-x-[1px] flex-1 text-center text-[13px] font-semibold px-6">
          Any week
        </div>
        <div className="text-[13px] text-gray-400 pl-6 pr-2 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guest</div>
          <div className="p-2 bg-[#20B2D2] rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
