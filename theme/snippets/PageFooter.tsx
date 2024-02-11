'use client'

import React from "react";
import {Layout} from 'antd';

export default function PageFooter() {
  return <Layout.Footer style={{textAlign: 'center'}}>
    Spraby ©{new Date().getFullYear()} Created by spraby application
  </Layout.Footer>
}
