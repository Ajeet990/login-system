import { NextResponse } from "next/server";
import prisma from "@/app/connection/db";

export const POST = async (req) => {
    try {
        const bData = await req.json()
        const findUser = await prisma.users.findUnique({
            where : {email:bData.email}
        })
        var rst = {
            success : false,
            message : "User not found."
        }

        if (!findUser) {
            return NextResponse.json(rst)
        }

        const updateUser = await prisma.users.update({
            where: {email:bData.email},
            data: {otp:bData.otp}
        })
        rst = {
            success : true,
            message:"OTP set successfully."
        }
        return NextResponse.json(rst)
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong",
            error : error
        })
    }
}