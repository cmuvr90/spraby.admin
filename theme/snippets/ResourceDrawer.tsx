import React, {useState} from "react";
import {Button, Drawer} from 'antd';
import {Paginator} from "@/types";
import ResourcePicker from "@/theme/snippets/ResourcePicker";

/**
 *
 * @param title
 * @param getResourceCallback
 * @param multiSelect
 * @param selectable
 * @param rowKey
 * @param columns
 * @param limit
 * @param selectedItems
 * @param onSelectCallback
 * @constructor
 */
export default function ResourceDrawer({
                                         title = '',
                                         getResourceCallback,
                                         multiSelect = true,
                                         selectable = false,
                                         rowKey = 'id',
                                         columns = [],
                                         limit = 10,
                                         selectedItems = [],
                                         onSelect: onSelectCallback = null
                                       }: Props) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const onSelect = async () => {
    setLoading(true);
    if (typeof onSelectCallback === 'function') await onSelectCallback(selected)
    setOpen(false)
    setLoading(false);
  }

  return <div>
    <div className={'flex justify-end'}>
      <Button onClick={() => setOpen(true)}>Select</Button>
    </div>
    <Drawer
      title={title}
      placement={'right'}
      width={500}
      onClose={() => setOpen(false)}
      open={open}
    >
      <div className={'flex flex-col gap-7'}>
        {
          open &&
          <ResourcePicker
            getResourceCallback={getResourceCallback}
            multiSelect={multiSelect}
            rowKey={rowKey}
            columns={columns}
            limit={limit}
            selectable={selectable}
            selectedItems={selectedItems}
            onSelect={async items => setSelected(items)}
          />
        }
        {
          open &&
          <div className={'flex justify-end'}>
            <Button disabled={!selected?.length} loading={loading} onClick={onSelect}>Choose</Button>
          </div>
        }
      </div>
    </Drawer>
  </div>
}

type Props = {
  title?: string

  getResourceCallback: (params: any) => Promise<{ items: any[], paginator?: Paginator }>
  multiSelect?: boolean,
  selectable?: boolean
  rowKey?: string,
  columns?: any[]
  limit?: number
  selectedItems?: string[]
  onSelect?: ((items: any[]) => Promise<void>) | null
}
