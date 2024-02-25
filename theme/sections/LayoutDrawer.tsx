'use client'

import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {Menu, Layout} from 'antd';
import type {MenuProps} from 'antd';
import {isMobile} from "react-device-detect";

export default function LayoutDrawer({menu = []}: { menu: MenuItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(pathname ? [pathname] : []);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setCollapsed(isMobile)
  }, []);

  useEffect(() => {
    if (pathname) {
      let [selected, parent] = search(menu, pathname);
      if (selected) onClickOnItem(selected, parent);
    }
  }, [pathname, menu]);

  /**
   *
   * @param item
   * @param parent
   */
  const onClickOnItem = (item: any, parent: any) => {
    setSelectedKeys([item.key])
    if (!collapsed) setOpenKeys(parent ? [parent.key] : [])
  }

  return <Layout.Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    collapsedWidth={isMobile ? 40 : 80}
  >
    <Menu
      theme="dark"
      selectedKeys={selectedKeys}
      mode={collapsed ? "vertical" : "inline"}
      items={menu}
      selectable
      onClick={i => router.push(i.key)}
      openKeys={collapsed ? undefined : openKeys}
    />
  </Layout.Sider>
}

type MenuItem = Required<MenuProps>['items'][number];

/**
 *
 * @param menu
 * @param path
 * @param parent
 */
function search(menu: any[], path: string, parent: any = null): [any, any] {
  for (const i of menu) {
    if (i?.children?.length) {
      let [selected, parent] = search(i.children, path, i)
      if (selected) return [selected, parent]
    }
    if (i?.key === path) return [i, parent];
  }
  return [null, parent];
}
