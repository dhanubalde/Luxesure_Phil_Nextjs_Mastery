import getCurrentUser from "@/actions/getCurrentUser"
import getListings from "@/actions/getListings";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import PropertiesClient from "./PropertiesClient"


const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) { 
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You dont have any properties yet!"
        />
      </ClientOnly>
    )
  }

  const listings = await getListings({ userId: currentUser.id });
  
    if (listings.length === 0) { 
      return (
        <ClientOnly>
          <EmptyState
            title="No properties found"
            subtitle="Looks like you haven't property"
          />
        </ClientOnly>
      );
    }
    return (  
      <ClientOnly>
        <PropertiesClient
          listings={listings}
          currentUser={ currentUser}
        />
      </ClientOnly>
    )
}

export default PropertiesPage