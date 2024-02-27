import React from "react";
import ResourceDrawer from "@/theme/snippets/ResourceDrawer";
import {getPage} from "@/services/Options";
import {Button, Card, Popconfirm, Typography} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {OptionsModel} from "@/prisma/types";
import {useRouter} from "next/navigation";

/**
 *
 * @param selectedItems
 * @param onSelect
 * @constructor
 */
export default function OptionsPicker({selectedItems = [], onChoose, onRemove, disabled}: Props) {
  const router = useRouter();

  return <Card title={'Options'}>
    <div className={'flex gap-3 flex-col'}>
      {
        selectedItems.map((i: OptionsModel) => {
          return <div className={'flex justify-start items-center w-full gap-3'}>
            <Typography.Text>
              <Button onClick={() => router.push(`/admin/options/${i.id}`)} type={'link'}>{i.name}</Button>
            </Typography.Text>
            {
              !!onRemove &&
              <Popconfirm
                title="Are you sure?"
                okText="Yes"
                cancelText="No"
                onConfirm={async () => await onRemove(i.id)}
              >
                <CloseOutlined/>
              </Popconfirm>
            }
          </div>
        })
      }
      <div className={'flex justify-end w-full'}>
        <ResourceDrawer
          disabled={disabled}
          getResourceCallback={getPage}
          columns={['name']}
          selectable
          multiSelect={true}
          limit={10}
          selectedItems={selectedItems.map(i => i.id)}
          onSelect={onChoose}
        />
      </div>
    </div>
  </Card>
}

type Props = {
  selectedItems?: OptionsModel[]
  onChoose?: (items: any[]) => Promise<void>
  onRemove?: (id: string) => Promise<void>
  disabled?: boolean
}
