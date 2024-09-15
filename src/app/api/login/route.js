import { NextResponse } from "next/server"
import { signIn } from "next-auth/react";
import prisma from "@/app/connection/db";
import bcrypt from "bcryptjs";



export const POST = async (req) => {
    const bData = await req.json()
    try {
        // const res = await signIn("credentials", {
        //     redirect: false,
        //     email: bData.email,
        //     password: bData.password,
        // });
        // console.log("rrr", res)
            // Check if user exists
        const user = await prisma.users.findUnique({
            where: { email : bData.email },
        });
        var rst = {
            success : false,
            message : "User not found",
            data : {}
        }
    
        if (!user) {
            return NextResponse.json(rst)
        }
        const isPasswordValid = await bcrypt.compare(bData.password, user.password);

        if (!isPasswordValid) {
            rst = {
                success : false,
                message : "Invaid password",
                data : {}
            }
            return NextResponse.json(rst)
        }

        // Return user data if successful (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        rst = {
            success : true,
            message : "Login success",
            data : userWithoutPassword
        }

        return NextResponse.json(rst)
    } catch (error) {
        return NextResponse.json({
            success : false,
            message : "Something went wrong : " + error
        })
    }
}