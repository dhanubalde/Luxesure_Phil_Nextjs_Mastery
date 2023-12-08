import getCurrentUser from "@/actions/getCurrentUser"
import getFavoriteListing from "@/actions/getFavoriteListing"
import getReservations from "@/actions/getReservations"
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import FavoritesClient from "./FavoritesClient"


const FavoritePage = async () => {
  const listings = await getFavoriteListing()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) { 
    return (
      <ClientOnly>
        <EmptyState
          title="Unuthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
    
  }


  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default FavoritePage