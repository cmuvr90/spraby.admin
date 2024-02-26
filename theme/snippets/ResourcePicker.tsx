import React, {useEffect, useState} from "react";
import {Input, Table} from 'antd';
import {Paginator} from "@/types";
import type {TableProps} from 'antd';

/**
 *
 * @param getResourceCallback
 * @param multiSelect
 * @param selectable
 * @param rowKey
 * @param columns
 * @param limit
 * @param selectedItems
 * @param onSelectCallback
 * @param refresh
 * @constructor
 */
export default function ResourcePicker({
                                         getResourceCallback,
                                         multiSelect = true,
                                         selectable = false,
                                         rowKey = 'id',
                                         columns = [],
                                         limit = 10,
                                         selectedItems = [],
                                         onSelect: onSelectCallback = null,
                                         refresh,
                                       }: Props) {
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(selectedItems);

  const [items, setItems] = useState<any[]>([])
  const [paginator, setPaginator] = useState<Paginator>()
  const [params, setParams] = useState<Params>({page: 1, limit, search: ''})

  useEffect(() => {
    onGetItems({...params, limit}).then()
  }, [params, limit, refresh]);

  useEffect(() => {
    if (typeof onSelectCallback === 'function') onSelectCallback(items.filter(i => selectedRowKeys.includes(i[rowKey]))).then()
  }, [selectedRowKeys]);

  /**
   *
   * @param params
   */
  const onGetItems = async (params: Params) => {
    setLoading(true);
    const {items, paginator} = await getResourceCallback(params);
    setItems(items);
    if (paginator) setPaginator(paginator)
    setLoading(false);
  }

  /**
   *
   * @param pagination
   * @param filters
   * @param sorter
   */
  const onChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setParams(v => ({
      ...v,
      page: pagination?.current ?? 1,
      limit: pagination?.pageSize ?? limit,
    }))
    setSelectedRowKeys([])
  }

  return <div className={'flex flex-col  bg-white rounded-lg'}>
    <div className={'flex flex-nowrap p-5'}>
      <Input value={params.search} onInput={(e: any) => {
        setParams(v => ({...v, page: 1, search: e.target.value}))
      }}/>
    </div>
    <Table
      onChange={onChange}
      rowKey={rowKey}
      loading={loading}
      scroll={{x: true}}
      rowSelection={selectable ? {
        checkStrictly: true,
        selectedRowKeys,
        type: multiSelect ? 'checkbox' : 'radio',
        onChange: setSelectedRowKeys as any
      } : undefined}
      columns={columns.map(i => typeof i === 'string' ? {dataIndex: i} : i)}
      dataSource={items}
      pagination={(paginator && paginator?.total <= limit) ? false : paginator}
    />
  </div>
}

type Props = {
  getResourceCallback: (params: any) => Promise<{ items: any[], paginator?: Paginator }>
  multiSelect?: boolean
  selectable?: boolean
  rowKey?: string
  columns?: any[]
  limit?: number
  selectedItems?: string[]
  onSelect?: ((items: any[]) => Promise<void>) | null,
  refresh?: any
}

type Params = {
  page: number,
  limit: number,
  search: string
}
