'use client'

import React, {ReactNode, useState} from 'react';
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
import {Layout, Menu, Flex, Typography} from 'antd';
import {useRouter, usePathname} from "next/navigation";
import UserPanel from "@/theme/snippets/UserPanel";
import {SessionProvider} from "next-auth/react";

const {Header, Content, Footer, Sider} = Layout;

const AdminLayout = ({children}: Readonly<{ children: ReactNode }>) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return <SessionProvider>
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
        <Flex justify={'space-between'} align={'center'} style={{width: '100%'}}>
          <Typography.Text style={{color: '#fff'}}>SPRABY ADMIN</Typography.Text>
          <UserPanel/>
        </Flex>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical"/>
          <Menu theme="dark" defaultSelectedKeys={[pathname as string]} mode="inline" items={items}
                onClick={(data) => router.push(data.key)}/>
        </Sider>
        <Layout>
          <Content style={{padding: '20px'}}>
            {children}
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Spraby ©{new Date().getFullYear()} Created by spraby application
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  </SessionProvider>
};

export default AdminLayout;

type MenuItem = Required<MenuProps>['items'][number];

const adminMenu = [
  {
    key: '/admin',
    label: 'Dashboard',
    icon: <GlobalOutlined/>
  },
  {
    key: '/admin/users',
    label: 'Users',
    icon: <UserOutlined/>
  },
  {
    key: '/admin/brands',
    label: 'Brands',
    icon: <ShopOutlined/>
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

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = adminMenu.map(i => getItem(i.label, i.key, i.icon))
// [
// getItem('Option 2', '2', <DesktopOutlined/>),
// getItem('User', 'sub1', <UserOutlined/>, [
//   getItem('Tom', '3'),
//   getItem('Bill', '4'),
//   getItem('Alex', '5'),
// ]),
// getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
// getItem('Files', '9', <FileOutlined/>),
// ];
