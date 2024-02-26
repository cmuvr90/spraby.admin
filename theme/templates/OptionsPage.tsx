'use client'

import React, {useState} from "react";
import {Button, Popconfirm, TableProps} from 'antd';
import {OptionsModel} from "@/prisma/types";
import {getPage, removeOne} from "@/services/Options";
import Link from "next/link";
import ResourcePicker from "@/theme/snippets/ResourcePicker";
import {Page} from "@/theme/sections";
import {useRouter} from "next/navigation";

export default function OptionsPage() {
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false)

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      render: (_, option: OptionsModel) => {
        return <Link href={`/admin/options/${option.id}`}>{option.name}</Link>
      }
    },
    {
      title: 'Action',
      align: 'end',
      render: (_, option: OptionsModel) => {
        return <Popconfirm
          title={'Are you sure?'}
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            await removeOne({where: {id: option.id}})
            setRefresh(v => !v)
          }}>
          <Button danger type={'link'} className={'p-0'}>
            {'Delete'}
          </Button>
        </Popconfirm>
      }
    }
  ];

  return <Page title={'Options'} headerActions={[{
    content: 'Create',
    type: 'primary',
    onAction: async () => router.push('/admin/options/create')
  }]}>
    <ResourcePicker
      getResourceCallback={params => getPage(params)}
      columns={columns}
      limit={10}
      refresh={refresh}
    />
  </Page>
}
