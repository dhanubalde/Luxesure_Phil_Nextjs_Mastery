import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback , useMemo} from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModel from "./useLoginModal";


interface IUseFavorite { 
    listingId: string;
    currentUser?: SafeUser | null;
}

const userFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => { 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const loginModal = useLoginModel();


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);
    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong !')
        }
    },
        [
            currentUser,
            hasFavorited,
            listingId,
            loginModal,
            router
        ]);
    
    return {
        hasFavorited,
        toggleFavorite
    }
}

export default userFavorite;