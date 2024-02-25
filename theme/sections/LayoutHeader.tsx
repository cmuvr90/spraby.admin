'use client'

import React from "react";
import {Layout, Typography} from 'antd';
import UserPanel from "@/theme/snippets/UserPanel";

export default function LayoutHeader({title}: { title: string }) {
  return <Layout.Header className={'flex items-center py-2 px-10'}>
    <div className={'flex justify-between items-center w-full'}>
      <Typography.Text style={{color: '#fff'}}>{title}</Typography.Text>
      <UserPanel/>
    </div>
  </Layout.Header>
}
