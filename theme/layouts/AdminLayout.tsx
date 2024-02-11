'use client'

import React, {ReactNode} from 'react';
import {
  GlobalOutlined,
  UserOutlined,
  TagsOutlined,
  SolutionOutlined,
  ProfileOutlined,
  ShopOutlined,
  BarsOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout} from 'antd';
import {SessionProvider} from "next-auth/react";
import PageDrawer from "@/theme/snippets/PageDrawer";
import PageHeader from "@/theme/snippets/PageHeader";
import PageFooter from "@/theme/snippets/PageFooter";
import PageContent from "@/theme/snippets/PageContent";
import {useRouter} from "next/navigation";

const AdminLayout = ({children}: { children: ReactNode }) => {
  const router = useRouter();

  const menu: MenuItem[] = [
    {
      key: '/admin',
      label: 'Dashboard',
      icon: <GlobalOutlined/>
    },
    {
      key: '/admin/users',
      label: 'Users',
      icon: <UserOutlined/>,
    },
    {
      key: '/admin/brands',
      label: 'Brands',
      icon: <ShopOutlined/>,
      onTitleClick: (data => router.push(data.key)),
      children: [{
        key: '/admin/brands/create',
        label: 'Create',
      }],
    },
    {
      key: '/admin/categories',
      label: 'Categories',
      icon: <SolutionOutlined/>
    },
    {
      key: '/admin/collections',
      label: 'Collections',
      icon: <ProfileOutlined/>
    },
    {
      key: '/admin/options',
      label: 'Options',
      icon: <TagsOutlined/>
    },
    {
      key: '/admin/navigations',
      label: 'Navigation',
      icon: <BarsOutlined/>
    }
  ]

  return <SessionProvider>
    <Layout style={{minHeight: '100vh'}}>
      <PageHeader title={'SPRABY ADMIN'}/>
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

export default AdminLayout;

type MenuItem = Required<MenuProps>['items'][number];


