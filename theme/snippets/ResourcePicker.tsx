import React, {useEffect, useState} from "react";
import {Table} from 'antd';
import {Paginator} from "@/types";
import type {TableProps} from 'antd';

/**
 *
 * @param getResourceCallback
 * @param multiSelect
 * @param rowKey
 * @param columns
 * @param limit
 * @param title
 * @constructor
 */
export default function ResourcePicker({
                                         getResourceCallback,
                                         multiSelect = true,
                                         selectable = false,
                                         rowKey = 'id',
                                         columns = [],
                                         limit = 10,
                                       }: Props) {
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const [items, setItems] = useState<any[]>([])
  const [paginator, setPaginator] = useState<Paginator>()
  const [params, setParams] = useState<Params>({page: 1, limit})

  useEffect(() => {
    onGetUsers(params).then()
  }, [params]);

  /**
   *
   * @param params
   */
  const onGetUsers = async (params: Params) => {
    setLoading(true);
    const {items, paginator} = await getResourceCallback(params);
    setItems(items);
    if (paginator) setPaginator(paginator)
    setLoading(false);
  }

  /**
   *
   * @param item
   * @param selected
   */
  const onSelect = (item: any, selected: boolean) => {
    if (multiSelect) {
      setSelectedRowKeys(v => selected ? [...v, item[rowKey]] : v.filter(i => i !== item[rowKey]))
    } else {
      setSelectedRowKeys(selected ? [item[rowKey]] : [])
    }
  }

  /**
   *
   * @param keys
   * @param items
   * @param options
   */
  const onSelectAll = (keys: string[], items: any[], options: { type: 'all' | 'single' }) => {
    if (options.type === 'all' && multiSelect) setSelectedRowKeys(keys);
  }

  /**
   *
   * @param pagination
   * @param filters
   * @param sorter
   */
  const onChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setParams({
      page: pagination?.current ?? 1,
      limit: pagination?.pageSize ?? limit
    })
    setSelectedRowKeys([])
  }

  return <Table
    onChange={onChange}
    rowKey={rowKey}
    loading={loading}
    scroll={{x: true}}
    rowSelection={selectable ? {
      checkStrictly: true,
      selectedRowKeys,
      onSelect,
      type: multiSelect ? 'checkbox' : 'radio',
      onChange: onSelectAll as any
    } : undefined}
    columns={columns.map(i => typeof i === 'string' ? {dataIndex: i} : i)}
    dataSource={items}
    pagination={(paginator && paginator?.total <= limit) ? false : paginator}
  />
}

type Props = {
  getResourceCallback: (params: any) => Promise<{ items: any[], paginator?: Paginator }>
  multiSelect?: boolean,
  selectable?: boolean
  rowKey?: string,
  columns?: any[]
  limit?: number
}

type Params = {
  page: number,
  limit: number
}
