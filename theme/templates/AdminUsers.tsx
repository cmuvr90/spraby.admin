'use client'

import React, {useEffect, useState} from "react";
import {Table, Tag} from 'antd';
import type {TableProps} from 'antd';
import {UsersModel} from "@/prisma/types";
import {getUsersList} from "@/services/Users";

export default function AdminUsers() {
  const [users, setUsers] = useState<UsersModel[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onGetUsers().then()
  }, []);

  const onGetUsers = async () => {
    setLoading(true)
    const users = await getUsersList()
    setUsers(users)
    setLoading(false)
  }

  return <Table
    loading={loading}
    columns={columns}
    dataSource={users}
    pagination={false}
  />
}

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => name ?? '-',
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
