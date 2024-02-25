'use client'

import React, {ReactNode} from 'react';
import {
  GlobalOutlined,
  UserOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import {Layout} from 'antd';
import {SessionProvider} from "next-auth/react";
import {LayoutFooter, LayoutHeader, LayoutDrawer, LayoutContent} from "@/theme/sections";

const ManagerLayout = ({children}: Readonly<{ children: ReactNode }>) => {
  return <SessionProvider>
    <Layout style={{minHeight: '100vh'}}>
      <LayoutHeader title={'SPRABY'}/>
      <Layout>
        <LayoutDrawer menu={menu}/>
        <Layout>
          <LayoutContent>
            {children}
          </LayoutContent>
          <LayoutFooter/>
        </Layout>
      </Layout>
    </Layout>
  </SessionProvider>
};

export default ManagerLayout;

const menu = [
  {
    key: '/manager',
    label: 'Dashboard',
    icon: <GlobalOutlined/>
  },
  {
    key: '/manager/products',
    label: 'Products',
    icon: <UserOutlined/>
  },
  {
    key: '/manager/orders',
    label: 'Orders',
    icon: <ShopOutlined/>
  },
]
