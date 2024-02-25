import React from "react";
import ResourceDrawer from "@/theme/snippets/ResourceDrawer";
import {getPage as getPageUsers} from "@/services/Users";
import {Avatar, Card, Popconfirm, Typography} from "antd";
import {CloseOutlined, UserOutlined} from "@ant-design/icons";
import {UsersModel} from "@/prisma/types";

/**
 *
 * @param selectedItems
 * @param onSelect
 * @constructor
 */
export default function UsersPicker({selectedItems = [], onChoose, onRemove, disabled}: Props) {

  return <Card title={'User'}>
    <div className={'flex gap-3 flex-col'}>
      {
        selectedItems.map((i: UsersModel) => {
          return <div className={'flex justify-start items-center w-full gap-3'}>
            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
            <Typography.Text>{i.email}</Typography.Text>
            {
              !!onRemove &&
              <Popconfirm
                title="Delete the user"
                description="Are you sure to delete this user?"
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
          getResourceCallback={(params) => getPageUsers(params, {
            where: {
              role: 'manager',
              brands: {
                every: {
                  usersId: null
                }
              }
            }
          })}
          columns={['email']}
          selectable
          multiSelect={false}
          limit={10}
          selectedItems={selectedItems.map(i => i.id)}
          onSelect={onChoose}
        />
      </div>
    </div>
  </Card>
}

type Props = {
  selectedItems?: UsersModel[]
  onChoose?: (items: any[]) => Promise<void>
  onRemove?: (id: string) => Promise<void>
  disabled?: boolean
}
