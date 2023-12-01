"use client"
import { Range} from "react-date-range"
import { TbCurrencyPeso } from "react-icons/tb";

interface ListingReservationProps { 
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disbledDates?: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({ 
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disbledDates
}) => {
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="flex flex-row items-center text-2xl font-semibold">
        <TbCurrencyPeso/>{price}
        </div>
        <div className="font-semibold bg-[#acf0ff] px-2 rounded-3xl text-[#09a0c2] text-[12px]">
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value)=> onChangeDate(value.selection)}
      />
  </div>
  )
}

export default ListingReservation
