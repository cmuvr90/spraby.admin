'use client'

import React, {useEffect, useState} from "react";
import {PageParams} from "@/types";
import {Button, Card, Form, Input, Typography} from "antd";
import {findById, update, create} from "@/services/Brands";
import {getPage as getPageUsers} from "@/services/Users";
import {BrandsModel} from "@/prisma/types";
import Prisma from "@/prisma/types";
import {useRouter} from "next/navigation";
import ResourceDrawer from "@/theme/snippets/ResourceDrawer";

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
    const brand = await findById(id)
    if (brand) setBrand(brand);
    setLoading(false);
  }

  /**
   *
   * @param values
   */
  const onUpdate = async (values: BrandsModel) => {
    setLoading(true);
    const brand = await update({where: {id}, data: (values as Prisma.BrandsUpdateInput)})
    if (brand) setBrand(brand);
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
    onFinish={id ? onUpdate : onCreate}
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
        <Card loading={loading} className={'flex-grow min-w-60'}>
          <Form.Item<BrandsModel> name="name">
            <Input placeholder={'Name'}/>
          </Form.Item>
          <Form.Item<BrandsModel> name="description" style={{margin: 0}}>
            <Input placeholder={'Description'}/>
          </Form.Item>
        </Card>
        <Card title={'User'} className={'flex-grow min-w-60'}>
          <ResourceDrawer getResourceCallback={getPageUsers} columns={['email']} selectable multiSelect={false} limit={10}/>
        </Card>
      </div>
    </div>
  </Form>
}
