'use client'

import {Button, Stack} from "@mui/material";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onLogout = async () => {
    const response = await signOut({redirect: false, callbackUrl: '/'});
    if (response?.url) router.push('/');
  }

  return <Stack>
    <Button onClick={onLogout}>Logout</Button>
  </Stack>
}
