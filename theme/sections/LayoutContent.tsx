'use client'

import React, {ReactNode} from "react";
import {Layout} from 'antd';

export default function LayoutContent({children}: { children: ReactNode }) {
  return <Layout.Content className={'bg-gray-100 p-5 m-auto w-full'}>
    {children}
  </Layout.Content>
}
