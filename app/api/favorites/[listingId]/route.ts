import { NextResponse } from "next/server"; 
import prisma from "@/lib/prismadb"

import getCurrentUser from "@/actions/getCurrentUser";

interface IParams { 
    listingId?: string
}

export default async function POST(
    request: Request,
    { params }: {params: IParams}

){ 
    const currentUser = await getCurrentUser();

    if (!currentUser) { 
        return NextResponse.error();

    }
    
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") { 
        
    }
}