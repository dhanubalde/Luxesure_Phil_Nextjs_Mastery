"use client"
import qs from "query-string"
import useSearchModel from "@/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import { CountrySelectValue } from "../inputs/CountrySelect"
import { formatISO } from "date-fns"


enum STEPS { 
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}


const SearchModal = () => {
  const searchModal = useSearchModel()
  const router = useRouter()
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>();


  const Map = useMemo(() => dynamic(() => import('@/components/inputs/Map'), {
    ssr: false
  }), []);


  const onBack = useCallback(() => { 
    setStep((value) => value - 1)
  },[])



  const onNext = useCallback(() => { 
    setStep((value) => value + 1)
  }, [])
  

  const onSubmit = useCallback(async () => { 
    if (step !== STEPS.INFO) { 
      return onNext();
    }

    let currentQuery = {};

    if (params) { 
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if (dateRange?.startDate) { 
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange?.endDate) { 
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }
  },[])


  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      actionLabel="Search"
      />
  )
}

export default SearchModal