"use client"
 

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "../types"

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";



interface TripsClientProps { 
    listings: SafeListing[];
    currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    
    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listings deleted');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      }).finally(() => {
        setDeletingId('');
      })
  }, [router])


  return (
    <Container>
      <Heading
        title="Properties"
        center={false}
        subtitle="List of your properties"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );

}

export default TripsClient
