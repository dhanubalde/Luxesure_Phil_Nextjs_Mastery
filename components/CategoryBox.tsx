'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3 
      border-b-2
       hover:text-neutral-900
      cursor-pointer
      transition 
     
      ${selected ? 'border-b-neutral-900 ' : 'border-transparent'}
      ${selected ? 'text-neutral-900' : 'text-neutral-500'}
      `}
    >
      <Icon size={25} />
      <div className="font-bold text-[12px]">{label}</div>
    </div>
  );
};

export default CategoryBox;
