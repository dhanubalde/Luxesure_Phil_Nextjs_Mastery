"use client"
import qs from "query-string"
import useSearchModel from "@/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import { formatISO } from "date-fns"
import Heading from "../Heading"
import Counter from "../inputs/Counter"
import Calendar from "../inputs/Calendar"



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
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });


  const Map = useMemo(() => dynamic(() => import('@/components/inputs/Map'), {
    ssr: false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [location]);


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

    if (dateRange.startDate) { 
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) { 
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });


    setStep(STEPS.LOCATION);
    searchModal.onClose();
    
    router.push(url)
  }, [
    router,
    searchModal,
    location,
    step,
    guestCount,
    roomCount,
    bathroomCount,
    onNext,
    params,
    dateRange
  ])



  // const setCustomValue = (id: string, value: any) => {
  //   setValue(id, value, {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //     shouldValidate: true,
  //   });
  // };




  //action button
  const actionLabel = useMemo(() => { 
    if (step === STEPS.INFO) { 
      return 'Search'
    }
    return 'Next'
  },[step])


  const secondActionLabel = useMemo(() => { 
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Back'
  }, [step])
  
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
        center={ false}
      />
      <CountrySelect
        value={location}
        onChange={(value) =>
          setLocation(value as CountrySelectValue)
        }
      />
      <hr />
      <Map center={location?.latlng}/>
    </div>
    
  )
  
  if (step === STEPS.DATE) { 
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="When do you plan to go?  "
          subtitle="make sure everyone is free "
          center={ false}
        />
   
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      
      </div>
    )
  }

  if (step === STEPS.INFO) { 
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center={false}
          title="What best for your place?"
          subtitle="select do you wanna need to!"
        />
        <Counter
          title='Guests'
          subtitle='How many guest do you allow?'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
          <Counter
          title='Rooms'
          subtitle='Hoq many rooms do you have?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
          <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setbathroomCount(value)}
        />
      </div>
    )
  }
  
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
      />
  )
}

export default SearchModal