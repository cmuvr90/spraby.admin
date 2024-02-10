'use client'

import React, {ReactNode, useState} from 'react';
import {
  GlobalOutlined,
  UserOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, Flex, Typography} from 'antd';
import {useRouter, usePathname} from "next/navigation";
import {SessionProvider} from "next-auth/react";
import UserPanel from "@/theme/snippets/UserPanel";

const {Header, Content, Footer, Sider} = Layout;

const ManagerLayout = ({children}: Readonly<{ children: ReactNode }>) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return <SessionProvider>
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
        <Flex justify={'space-between'} align={'center'} style={{width: '100%'}}>
          <Typography.Text style={{color: '#fff'}}>SPRABY MANAGER</Typography.Text>
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

export default ManagerLayout;

type MenuItem = Required<MenuProps>['items'][number];

const adminMenu = [
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
