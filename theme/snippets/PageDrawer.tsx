'use client'

import React, {useEffect, useMemo, useState} from "react";
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

  /**
   *
   */
  const activeKey = useMemo(() => {
    const path = (pathname ?? '').split('/').filter((_, i) => i < 3).join('/');
    const activeMenuItem = menu.find(i => i?.key === path)
    return activeMenuItem?.key as string ?? '0';
  }, [pathname, menu])

  return <Layout.Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    collapsedWidth={isMobile ? 40 : 80}
  >
    <Menu
      theme="dark"
      defaultSelectedKeys={[activeKey]}
      selectedKeys={[activeKey]}
      mode="vertical"
      items={menu}
      selectable
      // onMouseDown={(data) => console.log(data)}
      // onChange={(data) => console.log(data)}
      // onSelect={(data) => console.log(data)}
      onClick={(data) => router.push(data.key)}
    />
  </Layout.Sider>
}

type MenuItem = Required<MenuProps>['items'][number];
