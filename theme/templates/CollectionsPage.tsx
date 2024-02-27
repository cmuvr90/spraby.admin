'use client'

import React, {useState} from "react";
import {Button, Popconfirm, TableProps} from 'antd';
import {CollectionsModel} from "@/prisma/types";
import {getPage, removeOne} from "@/services/Collections";
import Link from "next/link";
import ResourcePicker from "@/theme/snippets/ResourcePicker";
import {Page} from "@/theme/sections";
import {useRouter} from "next/navigation";

export default function CollectionsPage() {
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false)

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      render: (_, collection: CollectionsModel) => {
        return <Link href={`/admin/collections/${collection.id}`}>{collection.name}</Link>
      }
    },
    {
      title: 'Action',
      align: 'end',
      render: (_, collection: CollectionsModel) => {
        return <Popconfirm
          title={'Are you sure?'}
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            await removeOne(collection.id)
            setRefresh(v => !v)
          }}>
          <Button danger type={'link'} className={'p-0'}>
            {'Delete'}
          </Button>
        </Popconfirm>
      }
    }
  ];

  return <Page title={'Collections'} headerActions={[{
    content: 'Create',
    type: 'primary',
    onAction: async () => router.push('/admin/collections/create')
  }]}>
    <ResourcePicker
      getResourceCallback={params => getPage(params)}
      columns={columns}
      limit={10}
      refresh={refresh}
    />
  </Page>
}
