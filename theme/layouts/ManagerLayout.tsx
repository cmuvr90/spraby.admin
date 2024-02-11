'use client'

import React, {ReactNode} from 'react';
import {
  GlobalOutlined,
  UserOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import {Layout} from 'antd';
import {SessionProvider} from "next-auth/react";
import PageDrawer from "@/theme/snippets/PageDrawer";
import PageHeader from "@/theme/snippets/PageHeader";
import PageFooter from "@/theme/snippets/PageFooter";
import PageContent from "@/theme/snippets/PageContent";

const ManagerLayout = ({children}: Readonly<{ children: ReactNode }>) => {
  return <SessionProvider>
    <Layout style={{minHeight: '100vh'}}>
      <PageHeader title={'SPRABY MANAGER'}/>
      <Layout>
        <PageDrawer menu={menu}/>
        <Layout>
          <PageContent>
            {children}
          </PageContent>
          <PageFooter/>
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
