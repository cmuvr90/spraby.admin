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
import {LayoutFooter, LayoutHeader, LayoutDrawer, LayoutContent} from "@/theme/sections";
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
        key: '/admin/brands',
        label: 'List',
      }, {
        key: '/admin/brands/create',
        label: 'Create',
      }],
    },
    {
      key: '/admin/categories',
      label: 'Categories',
      icon: <SolutionOutlined/>,
      onTitleClick: (data => router.push(data.key)),
      children: [{
        key: '/admin/categories',
        label: 'List',
      }, {
        key: '/admin/categories/create',
        label: 'Create',
      }],
    },
    {
      key: '/admin/collections',
      label: 'Collections',
      icon: <ProfileOutlined/>,
      onTitleClick: (data => router.push(data.key)),
      children: [{
        key: '/admin/collections',
        label: 'List',
      }, {
        key: '/admin/collections/create',
        label: 'Create',
      }],
    },
    {
      key: '/admin/options',
      label: 'Options',
      icon: <TagsOutlined/>,
      onTitleClick: (data => router.push(data.key)),
      children: [{
        key: '/admin/options',
        label: 'List',
      }, {
        key: '/admin/options/create',
        label: 'Create',
      }],
    },
    {
      key: '/admin/navigations',
      label: 'Navigation',
      icon: <BarsOutlined/>
    }
  ]

  return <SessionProvider>
    <Layout className={'min-h-lvh'}>
      <LayoutHeader title={'SPRABY ADMIN'}/>
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

export default AdminLayout;

type MenuItem = Required<MenuProps>['items'][number];


