'use client'

import React, {useEffect, useState} from "react";
import {Card, Table, Tag} from 'antd';
import type {TableProps} from 'antd';
import {UsersModel} from "@/prisma/types";
import {getPage} from "@/services/Users";
import Link from "next/link";
import type {Paginator} from "@/types";

export default function AdminUsers() {
  const [users, setUsers] = useState<UsersModel[]>([])
  const [paginator, setPaginator] = useState<Paginator>()
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({limit: 1, page: 1})

  useEffect(() => {
    onGetUsers(params).then()
  }, [params]);

  /**
   *
   * @param params
   */
  const onGetUsers = async (params: QueryParams) => {
    setLoading(true)
    const {items = [], paginator = null} = await getPage(params)
    setUsers(items)
    if (paginator) setPaginator(paginator)
    setLoading(false)
  }

  /**
   *
   * @param pagination
   * @param filters
   * @param sorter
   */
  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setParams({
      page: pagination?.current ?? 1,
      limit: pagination?.pageSize ?? 10
    })
  }

  return <Card>
    <Table
      onChange={handleTableChange}
      loading={loading}
      scroll={{x: true}}
      columns={columns}
      dataSource={users.map(i => ({...i, key: i.id}))}
      pagination={paginator}
    />
  </Card>
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
