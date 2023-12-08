'use client';

import React, { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchModel from '@/hooks/useSearchModal';
import useCountries from '@/hooks/useCountries';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const router = useRouter();
  const searchModal = useSearchModel();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  
  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => { 
    if (locationValue) { 
      return getByValue(locationValue as string)?.label
    }
    return 'Anywhere'
  }, [getByValue, locationValue])
  

  const durationLabel = useMemo(() => { 
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let diff = differenceInDays(end, start)


      if (diff === 0) { 
        diff = 1
      }
      return `${diff} Days`;
    }
    
    return 'Any Week'
  },[startDate,endDate])


  const guestLabel = useMemo(() => { 
    if (guestCount) { 
      return `${guestCount} Guests`
    }
    return 'Add Guests'
  },[guestCount])


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
        <div className="text-[13px] font-semibold px-6">
          {locationLabel}
        </div>
        <div className="hidden sm:block border-x-[1px] flex-1 text-center text-[13px] font-semibold px-6">
          { durationLabel}
        </div>
        <div className="text-[13px] text-gray-400 pl-6 pr-2 flex flex-row items-center gap-3">
          <div className="hidden sm:block">
            { guestLabel }
          </div>
          <div className="p-2 bg-[#20B2D2] rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
