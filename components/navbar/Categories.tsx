"use client"

import Container from '../Container';
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { RiHotelLine } from 'react-icons/ri';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'this is a property has windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Hotels',
    icon: RiHotelLine,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Beach1',
    icon: TbBeach,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Windmills1',
    icon: GiWindmill,
    description: 'this is a property has windmills',
  },
  {
    label: 'Modern1',
    icon: MdOutlineVilla,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Hotels4',
    icon: RiHotelLine,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Beach2',
    icon: TbBeach,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Windmills2',
    icon: GiWindmill,
    description: 'this is a property has windmills',
  },
  {
    label: 'Modern2',
    icon: MdOutlineVilla,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Hotels5',
    icon: RiHotelLine,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Beach3',
    icon: TbBeach,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Windmills3',
    icon: GiWindmill,
    description: 'this is a property has windmills',
  },
  {
    label: 'Modern3',
    icon: MdOutlineVilla,
    description: 'this is a property too close the beach!',
  },
  {
    label: 'Hotels2',
    icon: RiHotelLine,
    description: 'this is a property too close the beach!',
  }
  
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-5 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
