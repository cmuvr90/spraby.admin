'use client'

import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import React from "react";
import {Button} from "antd";

export default function LogoutForm() {
  const router = useRouter();

  const onLogout = async () => {
    const response = await signOut({redirect: false, callbackUrl: '/'});
    if (response?.url) router.push('/login');
  }

  return <Button type="link" onClick={onLogout}> Logout </Button>
}
