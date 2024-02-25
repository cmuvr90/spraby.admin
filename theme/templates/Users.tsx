'use client'

import React, {useEffect, useState} from "react";
import {Card, Table, Tag} from 'antd';
import type {TableProps} from 'antd';
import {UsersModel} from "@/prisma/types";
import {getPage} from "@/services/Users";
import Link from "next/link";
import type {Paginator} from "@/types";
import {Page} from "@/theme/sections";
import ResourcePicker from "@/theme/snippets/ResourcePicker";

export default function Users() {
  return <Page title={'Users'}>
    <ResourcePicker
      getResourceCallback={params => getPage(params, {where: {role: 'manager'}})}
      columns={columns}
      limit={10}
    />
  </Page>
}

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, user: UsersModel) => {
      const name = [user.firstName, user.lastName].filter(i => i?.length).join(' ');
      return <Link href={`/admin/users/${user.id}`}>{name?.length ? name : user.email}</Link>
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role) => <Tag color={'blue'}>
      {role.toUpperCase()}
    </Tag>
  }
];

interface QueryParams {
  page: number,
  limit: number
}
