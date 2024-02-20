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
                                       }: Props) {
  const [open, setOpen] = useState(false)

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
      {
        open &&
        <ResourcePicker
          getResourceCallback={getResourceCallback}
          multiSelect={multiSelect}
          rowKey={rowKey}
          columns={columns}
          limit={limit}
          selectable={selectable}
        />
      }
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
}
