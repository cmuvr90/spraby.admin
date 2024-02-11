'use client'

import React, {useEffect, useState} from "react";
import {Table} from 'antd';
import type {TableProps} from 'antd';
import {BrandsModel} from "@/prisma/types";
import {getPage} from "@/services/Brands";
import Link from "next/link";
import type {Paginator} from "@/types";

export default function Brands() {
  const [brands, setBrands] = useState<BrandsModel[]>([])
  const [paginator, setPaginator] = useState<Paginator>()
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({limit: 1, page: 1})

  useEffect(() => {
    onGetBrands(params).then()
  }, [params]);

  /**
   *
   * @param params
   */
  const onGetBrands = async (params: QueryParams) => {
    setLoading(true)
    const {items = [], paginator = null} = await getPage(params)
    setBrands(items)
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

  return <Table
    onChange={handleTableChange}
    loading={loading}
    scroll={{x: true}}
    columns={columns}
    dataSource={brands.map(i => ({...i, key: i.id}))}
    pagination={paginator}
  />
}

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, brand: BrandsModel) => {
      return <Link href={`/admin/brands/${brand.id}`}>{brand.name}</Link>
    }
  }
];

interface QueryParams {
  page: number,
  limit: number
}
