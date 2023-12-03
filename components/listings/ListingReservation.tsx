"use client"
import { Range} from "react-date-range"
import { TbCurrencyPeso } from "react-icons/tb";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps { 
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates?: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({ 
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
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
      <hr />
      <div className=" p-4">
          <Button
            disabled={disabled}
            label="Reserve"
            onClick={onSubmit}
          />
      </div>
      <div className="
        p-4
        flex
        flex-row
        items-center
        justify-between
        font-semibold
        text-lg
      ">
        <div>
          total
        </div>
        <div className="flex flex-row items-center">
          <TbCurrencyPeso/>{totalPrice}
        </div>
      </div>
  </div>
  )
}

export default ListingReservation
