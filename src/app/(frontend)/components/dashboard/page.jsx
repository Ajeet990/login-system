'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MainLoader from "../mainLoader/page";

const Dashboard = () => {
    const router = useRouter()
    const { data: userData, status } = useSession()
    if (status === 'loading') {
        return <div><MainLoader /></div>
    }
    if (!userData) {
        router.push('/components/login')
    }
    const handleLogOut = () => {
        signOut({redirect:false})
        toast.success("Logged out successfully.")
        router.push('/')
    }
    // console.log(userData)
    return (
        <div>
            {
                userData ? (
                    <>
                        Welcome user
                        <div>
                            successfully logged is as : {userData.user.email}
                        </div>
                        <div>
                            <button onClick={handleLogOut}>Log Out</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Please login first</p>
                    </>
                )
            }

        </div>
    );
}

export default Dashboard
