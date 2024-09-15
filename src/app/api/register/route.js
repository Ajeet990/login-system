import { NextResponse } from "next/server"
import prisma from "@/app/connection/db"
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    try {
        const bData = await req.json()
        // console.log(bData)
        var rst = {
            success : false,
            message : "Email already exists",
        }
        const data = await prisma.users.findUnique({
            where : { email : bData.email }
        })
        if (data != null) {
            return NextResponse.json(rst)
        }
        const hashedPassword = await bcrypt.hash(bData.password, 10);


        const insertRst = await prisma.users.create({
            data : {
                name : bData.name,
                email : bData.email,
                password : hashedPassword,
                address : bData.address
            }
        })

        rst = {
            success : true,
            message : "Registered successfully.",
        }

        return NextResponse.json(rst)
    } catch (error) {
        console.log("error : ", error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error : error
        })
    }
}