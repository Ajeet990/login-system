'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main className="">
      {
        router.push('/components/login')
      }
    </main>
  );
}
