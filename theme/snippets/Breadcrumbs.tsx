'use client'

import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Breadcrumb} from 'antd';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([])

  useEffect(() => {
    if (pathname?.length) {
      setBreadcrumbs(pathname.split('/'))
    }
  }, [pathname]);

  return <Breadcrumb style={{margin: '16px 0'}}>
    {
      breadcrumbs.map(i => <Breadcrumb.Item>{i}</Breadcrumb.Item>)
    }
  </Breadcrumb>
}
