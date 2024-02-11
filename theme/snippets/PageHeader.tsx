'use client'

import React from "react";
import {Layout, Flex, Typography} from 'antd';
import UserPanel from "@/theme/snippets/UserPanel";

export default function PageHeader({title}: { title: string }) {
  return <Layout.Header style={{display: 'flex', alignItems: 'center', padding: '20px'}}>
    <Flex justify={'space-between'} align={'center'} style={{width: '100%'}}>
      <Typography.Text style={{color: '#fff'}}>{title}</Typography.Text>
      <UserPanel/>
    </Flex>
  </Layout.Header>
}
