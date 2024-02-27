'use client'

import React, {useState} from "react";
import {Button, Popconfirm, TableProps} from 'antd';
import {CategoriesModel} from "@/prisma/types";
import {getPage, removeOne} from "@/services/Categories";
import Link from "next/link";
import ResourcePicker from "@/theme/snippets/ResourcePicker";
import {Page} from "@/theme/sections";
import {useRouter} from "next/navigation";

export default function CategoriesPage() {
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false)

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      render: (_, category: CategoriesModel) => {
        return <Link href={`/admin/categories/${category.id}`}>{category.name}</Link>
      }
    },
    {
      title: 'Action',
      align: 'end',
      render: (_, category: CategoriesModel) => {
        return <Popconfirm
          title={'Are you sure?'}
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            await removeOne(category.id)
            setRefresh(v => !v)
          }}>
          <Button danger type={'link'} className={'p-0'}>
            {'Delete'}
          </Button>
        </Popconfirm>
      }
    }
  ];

  return <Page title={'Categories'} headerActions={[{
    content: 'Create',
    type: 'primary',
    onAction: async () => router.push('/admin/categories/create')
  }]}>
    <ResourcePicker
      getResourceCallback={params => getPage(params)}
      columns={columns}
      limit={10}
      refresh={refresh}
    />
  </Page>
}
