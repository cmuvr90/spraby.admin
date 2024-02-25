'use client'

import React, {useState} from "react";
import {Button, Popconfirm, TableProps} from 'antd';
import {BrandsModel} from "@/prisma/types";
import {getPage, removeOne} from "@/services/Brands";
import Link from "next/link";
import ResourcePicker from "@/theme/snippets/ResourcePicker";
import {Page} from "@/theme/sections";
import {useRouter} from "next/navigation";

export default function BrandsPage() {
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false)

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      render: (_, brand: BrandsModel) => {
        return <Link href={`/admin/brands/${brand.id}`}>{brand.name}</Link>
      }
    },
    {
      title: 'User',
      render: (_, brand: BrandsModel) => {
        return brand.user ? <Link href={`/admin/users/${brand.usersId}`}>{brand.user?.email}</Link> : '-'
      }
    },
    {
      title: 'Action',
      align: 'end',
      render: (_, brand: BrandsModel) => {
        return <Popconfirm
          title={'Are you sure?'}
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            await removeOne({where: {id: brand.id}})
            setRefresh(v => !v)
          }}>
          <Button danger type={'link'} className={'p-0'}>
            {'Delete'}
          </Button>
        </Popconfirm>
      }
    }
  ];

  return <Page title={'Brands'} headerActions={[{
    content: 'Create',
    type: 'primary',
    onAction: async () => router.push('/admin/brands/create')
  }]}>
    <ResourcePicker
      getResourceCallback={getPage}
      columns={columns}
      limit={10}
      refresh={refresh}
    />
  </Page>
}
