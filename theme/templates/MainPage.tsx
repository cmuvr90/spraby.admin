'use client'

import React, {useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function MainPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user?.id) router.push(`/${session.data.user.role}`)
  }, [session]);

  return <div/>
}
