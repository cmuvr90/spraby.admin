'use client'

import React, {useEffect, useState} from "react";
import {PageParams} from "@/types";
import {Avatar, Button, Card, Form, Input, Typography, message, Tooltip} from "antd";
import {findById, update, create} from "@/services/Brands";
import {getPage as getPageUsers} from "@/services/Users";
import {BrandsModel, UsersModel} from "@/prisma/types";
import Prisma from "@/prisma/types";
import {useRouter} from "next/navigation";
import ResourceDrawer from "@/theme/snippets/ResourceDrawer";
import {CloseOutlined, UserOutlined} from "@ant-design/icons";

export default function Brand({params}: PageParams) {
  const router = useRouter();
  const id = params.id;
  const [brand, setBrand] = useState<BrandsModel>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) onGetBrand(id).then()
  }, [id]);

  /**
   *
   * @param id
   */
  const onGetBrand = async (id: string) => {
    setLoading(true);
    const brand = await findById(id, {user: true})
    if (brand) setBrand(brand);
    setLoading(false);
  }

  /**
   *
   * @param values
   */
  const onUpdate = async (values: Prisma.BrandsUpdateInput) => {
    setLoading(true);
    const brand = await update({where: {id}, data: (values as Prisma.BrandsUpdateInput)})
    if (brand) await onGetBrand(id);
    message.open({type: 'success', content: 'Updated'})
    setLoading(false);
  }

  /**
   *
   * @param values
   */
  const onCreate = async (values: BrandsModel) => {
    setLoading(true);
    const brand = await create(values as Prisma.BrandsCreateInput)
    if (brand?.id) router.push(`/admin/brands/${brand.id}`);
  }

  return <Form
    disabled={loading}
    name="brand"
    onFinish={(values: any) => id ? onUpdate(values) : onCreate(values)}
    fields={brand ? Object.entries(brand).map(([name, value]) => ({name, value})) : []}
    autoComplete="off"
  >
    <div className={'flex flex-col gap-3'}>
      <div className={'flex gap-3 justify-between items-center flex-wrap'}>
        <Typography.Title level={2} style={{margin: 0}}>Brand</Typography.Title>
        <Button type="primary" htmlType="submit" loading={loading}>
          {id ? 'Update' : 'Create'}
        </Button>
      </div>
      <div className={'flex gap-3 justify-between flex-wrap'}>
        <div className={'flex-grow w-7/12'}>
          <Card loading={loading}>
            <Form.Item<BrandsModel> name="name">
              <Input placeholder={'Name'}/>
            </Form.Item>
            <Form.Item<BrandsModel> name="description" style={{margin: 0}}>
              <Input placeholder={'Description'}/>
            </Form.Item>
          </Card>
        </div>
        <div className={'flex-grow min-w-40'}>
          <Card title={'User'}>
            <div className={'flex gap-3 flex-col'}>
              {
                !!brand?.user &&
                <div className={'flex justify-start items-center w-full gap-3'}>
                  <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                  <Typography.Text>{brand.user.email}</Typography.Text>
                  <Tooltip title="remove">
                    <CloseOutlined onClick={async () => {
                      await onUpdate({user: {disconnect: true}})
                    }}/>
                  </Tooltip>
                </div>
              }
              <div className={'flex justify-end w-full'}>
                <ResourceDrawer
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
                  selectedItems={brand?.usersId ? [brand.usersId] : []}
                  onSelect={async (items: UsersModel[]) => {
                    if (items?.length && id) await onUpdate({user: {connect: {id: items[0].id}}})
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </Form>
}
