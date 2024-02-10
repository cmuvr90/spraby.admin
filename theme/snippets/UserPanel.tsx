'use client'

import React, {useEffect, useState} from "react";
import {Avatar, Popover, Button} from 'antd';
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function UserPanel({color = '#f56a00'}: { color?: string }) {
  const session = useSession();
  const router = useRouter();
  const [user, serUser] = useState<any>(null)

  useEffect(() => {
    if (session?.data?.user) serUser(session.data.user);
  }, [session]);

  const onLogout = async () => {
    const response = await signOut({redirect: false, callbackUrl: '/'});
    if (response?.url) router.push('/');
  }

  const contentMarkup = <Button type="link" onClick={onLogout}> Logout </Button>

  return !!user && <Popover content={contentMarkup} trigger="click">
    <div style={{cursor: 'pointer'}}>
      <Avatar style={{backgroundColor: color, verticalAlign: 'middle'}} size="large" gap={1}>
        {user.email}
      </Avatar>
    </div>
  </Popover>
}
