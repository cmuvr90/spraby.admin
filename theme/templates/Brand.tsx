'use client'

import React, {useEffect, useState} from "react";
import {PageParams} from "@/types";
import {Button, Flex, Form, Input} from "antd";
import {findById, update, create} from "@/services/Brands";
import {BrandsModel} from "@/prisma/types";
import Prisma from "@/prisma/types";
import {useRouter} from "next/navigation";

export default function Brand({params}: PageParams) {
  const router = useRouter();
  const id = params.id;
  const [brand, setBrand] = useState<BrandsModel>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) onGetBrand(id).then()
  }, [id]);

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
  const onUpdate = async (values: Prisma.BrandsUpdateInput) => {
    setLoading(true);
    const brand = await update({where: {id}, data: values})
    if (brand) setBrand(brand);
    setLoading(false);
  }

  /**
   *
   * @param values
   */
  const onCreate = async (values: Prisma.BrandsCreateInput) => {
    setLoading(true);
    const brand = await create(values)
    if (brand?.id) router.push(`/admin/brands/${brand.id}`);
  }

  return <div style={{maxWidth: '400px', margin: '0 auto'}}>
    <Form
      disabled={loading}
      name="user"
      onFinish={id ? onUpdate : onCreate}
      fields={brand ? Object.entries(brand).map(([name, value]) => ({name, value})) : []}
      autoComplete="off"
    >
      <Form.Item<Prisma.BrandsUpdateInput> name="name">
        <Input placeholder={'Name'}/>
      </Form.Item>

      <Form.Item<Prisma.BrandsUpdateInput> name="description">
        <Input placeholder={'Description'}/>
      </Form.Item>

      <Form.Item>
        <Flex justify={'flex-end'}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {id ? 'Update' : 'Create'}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  </div>
}
