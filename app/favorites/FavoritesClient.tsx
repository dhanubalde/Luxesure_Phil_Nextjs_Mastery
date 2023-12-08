"use client"

import Container from "@/components/Container"
import { SafeListing, SafeUser } from "../types"
import Heading from "@/components/Heading"
import ListingCard from "@/components/listings/ListingCard"

interface FavoritesClientProps { 
    listings: SafeListing[]
    currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ 
    listings,
    currentUser
}) => {
  return (
    <Container>
      <Heading
        center={ false}
        title="Favorites"
        subtitle="list of place you have favorited! "
      />
      <div className="
      mt-10
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
      ">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
   </Container>
  )
}

export default FavoritesClient