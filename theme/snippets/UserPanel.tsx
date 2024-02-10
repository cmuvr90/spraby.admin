'use client'

import React, {useEffect, useState} from "react";
import {Avatar, Popover} from 'antd';
import {useSession} from "next-auth/react";
import LogoutForm from "@/theme/snippets/LogoutForm";

export default function UserPanel({color = '#f56a00'}: { color?: string }) {
  const session = useSession();
  const [user, serUser] = useState<any>(null)

  useEffect(() => {
    if (session?.data?.user) serUser(session.data.user);
  }, [session]);

  return !!user && <Popover content={<LogoutForm/>} trigger="click">
    <div style={{cursor: 'pointer'}}>
      <Avatar style={{backgroundColor: color, verticalAlign: 'middle'}} size="large" gap={1}>
        {user.email[0].toUpperCase()}
      </Avatar>
    </div>
  </Popover>
}
