'use client'

import React from "react";
import {Card} from 'antd';
import type {TableProps} from 'antd';
import {BrandsModel} from "@/prisma/types";
import {getPage} from "@/services/Brands";
import Link from "next/link";
import ResourcePicker from "@/theme/snippets/ResourcePicker";

export default function Brands() {
  return <Card>
    <ResourcePicker
      getResourceCallback={getPage}
      columns={columns}
      limit={10}
    />
  </Card>
}

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (_, brand: BrandsModel) => {
      return <Link href={`/admin/brands/${brand.id}`}>{brand.name}</Link>
    }
  }
];

interface QueryParams {
  page: number,
  limit: number
}
