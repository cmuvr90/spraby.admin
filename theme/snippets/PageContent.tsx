'use client'

import React, {ReactNode} from "react";
import {Layout} from 'antd';

export default function PageContent({children}: { children: ReactNode }) {
  return <Layout.Content style={{padding: '10px', background:'#eaeaea'}}>
    <div style={{background: '#fff', height: '100%', borderRadius: '10px', padding: '10px' }}>
      {children}
    </div>
  </Layout.Content>
}
