'use client'

import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {Menu, Layout} from 'antd';
import type {MenuProps} from 'antd';
import {isMobile} from "react-device-detect";

export default function PageDrawer({menu = []}: { menu: MenuItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile)
  }, []);

  return <Layout.Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    collapsedWidth={isMobile ? 40 : 80}
  >
    <Menu
      theme="dark"
      defaultSelectedKeys={[pathname as string]}
      mode="inline"
      items={menu}
      onClick={(data) => router.push(data.key)}
    />
  </Layout.Sider>
}

type MenuItem = Required<MenuProps>['items'][number];
