"use client"

import { SafeUser } from "@/app/types";
import useCountries from "@/hooks/useCountries";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps { 
    user: SafeUser | null
    description: string;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;


}
const ListingInfo: React.FC<ListingInfoProps> = ({ 
    user,
    description,
    category,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}) => {

  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by:  {user?.name}</div>
          <Avatar src={user?.image}/>
        </div>
        <div className=" flex flex-row items-center gap-2 font-semibold text-[#1299b8] text-[12px]">
          <div className="rounded-3xl bg-[#8CEAFF] px-2">
            {guestCount} guests
          </div>
          <div className="rounded-3xl bg-[#8CEAFF] px-2">
            { roomCount} rooms
          </div>
          <div className="rounded-3xl bg-[#8CEAFF] px-2">
            { bathroomCount } bathrooms
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={ category.description}
        />
      )}
    </div>
  )
}

export default ListingInfo