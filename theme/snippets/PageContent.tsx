'use client'

import React, {ReactNode} from "react";
import {Layout} from 'antd';

export default function PageContent({children}: { children: ReactNode }) {
  return <Layout.Content className={'p-3 bg-gray-100'}>
    <div style={{maxWidth: '1000px'}} className={'mt-0 m-auto'}>
      {children}
    </div>
  </Layout.Content>
}
