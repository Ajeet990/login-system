import { NextResponse } from "next/server";
import prisma from "@/app/connection/db";

export const POST = async (req) => {
    try {
        const bData = await req.json()

        console.log("here11", bData)
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

        if (findUser.otp != bData.otp) {
            var rst = {
                success : false,
                message : "OTP missmatch."
            }
            return NextResponse.json(rst)
        }

        const updateVerification = await prisma.users.update({
            where: {email:bData.email},
            data: {email_verified:1}
        })
        rst = {
            success : true,
            message:"OTP verified."
        }
        return NextResponse.json(rst)
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : "Something went wrong",
            error : error
        })
    }
}
