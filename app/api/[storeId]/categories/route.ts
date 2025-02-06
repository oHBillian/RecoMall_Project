import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params} : {params : {storeId: string}, }) {
    try {
        const { userId } = await auth();
        const { storeId } = await params
        const body = await req.json()
        const { name } = body;

        if(!name){
            return new NextResponse("name is required", {status: 500})
        }

        if(!userId){
            return new NextResponse("Unauthorized", {status: 500})
        }
        const store = await prismadb.store.findFirst({
            where: {
                userId
            }
        })

        if(!store){
            return new NextResponse("No store found", {status: 404})
        }

        if(!storeId){
            return new NextResponse("Store Id required", { status : 500});
        }

        const mainCategory = await prismadb.category.create({
            data : {
                storeId: storeId,
                name
            }
        })

        return NextResponse.json(mainCategory)
    } catch (error) {
        console.log("[MainCategories POST]", error)
        return new NextResponse("Interral error", {status: 500})
    }
}

export async function PATCH(req:Request,{params} : {params : {storeId: string}, }) {
    try {
        const { userId } = await auth();
        const { storeId } = await params
        const body = await req.json()
        const { UpdateId,name } = body;

        if(!UpdateId){
            return new NextResponse("Id is required", {status: 500})
        }

        if(!name){
            return new NextResponse("name is required", {status: 500})
        }
        

        if(!userId){
            return new NextResponse("Unauthorized", {status: 500})
        }
        const store = await prismadb.store.findFirst({
            where: {
                userId
            }
        })

        if(!store){
            return new NextResponse("No store found", {status: 404})
        }

        if(!storeId){
            return new NextResponse("Store Id required", { status : 500});
        }

        const categoryUpdate = await prismadb.category.update({
            where: {
                id: UpdateId
            },
            data: {
                name: name
            }
        })

        return NextResponse.json(categoryUpdate)
    } catch (error) {
        console.log("[MainCategories UPDATE]", error)
        return new NextResponse("Interral error", {status: 500})
    }
}

export async function DELETE(req:Request,{params} : {params : {storeId: string}, }) {
    try {
        const { userId } = await auth();
        const { storeId } = await params
        const body = await req.json()
        const { deleteId } = body;

        if(!deleteId){
            return new NextResponse("name is required", {status: 500})
        }

        if(!userId){
            return new NextResponse("Unauthorized", {status: 500})
        }
        const store = await prismadb.store.findFirst({
            where: {
                userId
            }
        })

        if(!store){
            return new NextResponse("No store found", {status: 404})
        }

        if(!storeId){
            return new NextResponse("Store Id required", { status : 500});
        }

        const mainCategory = await prismadb.category.delete({
            where: {
                id: deleteId
            }
        })

        return NextResponse.json(mainCategory)
    } catch (error) {
        console.log("[MainCategories DELETE]", error)
        return new NextResponse("Interral error", {status: 500})
    }
}

