import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name } = body;

        if(!name){
            return new NextResponse("Name is required", {status: 404});
        }
    
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const createStore = await prismadb.store.create({
            data: {
                name,
                userId,
            }
        })

        return NextResponse.json(createStore)
    } catch (error) {
        console.log("[POST_STORE]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}