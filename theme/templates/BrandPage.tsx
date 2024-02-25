'use client'

import React, {useEffect, useRef, useState} from "react";
import {PageParams} from "@/types";
import {Card, Form, Input, message} from "antd";
import {findFirst, update, create, removeOne} from "@/services/Brands";
import {BrandsModel, UsersModel} from "@/prisma/types";
import Prisma from "@/prisma/types";
import {useRouter} from "next/navigation";
import {Page} from "@/theme/sections";
import UsersPicker from "@/theme/snippets/UsersPicker";

/**
 *
 * @param params
 * @constructor
 */
export default function BrandPage({params}: PageParams) {
  const id = params.id;
  const formRef = useRef<any>();
  const router = useRouter();
  const [brand, setBrand] = useState<BrandsModel>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      onGetBrand(id).then()
    } else {
      setLoading(false)
    }
  }, [id]);

  /**
   *
   * @param id
   */
  const onGetBrand = async (id: string) => {
    setLoading(true);
    const brand = await findFirst({where: {id}, include: {user: true}})
    if (brand) setBrand(brand);
    setLoading(false);
  }

  /**
   *
   * @param data
   */
  const onUpdate = async (data: Prisma.BrandsUpdateInput) => {
    setSaving(true);
    try {
      const brand = await update({where: {id}, data, include: {user: true}})
      if (!brand) throw Error();
      setBrand(brand);
      message.open({type: 'success', content: 'Updated'})
    } catch (e: any) {
      console.warn('[ERROR UPDATE] Error: ', e?.message || e)
      message.open({type: 'error', content: 'Error update'})
    }
    setSaving(false);
  }

  /**
   *
   * @param data
   */
  const onCreate = async (data: Prisma.BrandsCreateInput) => {
    setSaving(true);
    try {
      const brand = await create({data, include: {user: true}})
      if (!brand) throw Error();
      message.open({type: 'success', content: 'Created'})
      router.push(`/admin/brands/${brand.id}`);
    } catch (e: any) {
      console.warn('[ERROR CREATE] Error: ', e?.message || e)
      message.open({type: 'error', content: 'Error create'})
      setSaving(false);
    }
  }

  /**
   *
   */
  const onDelete = async () => {
    setDeleting(true)
    try {
      await removeOne({where: {id}});
      message.open({type: 'success', content: 'Deleted'})
      router.push(`/admin/brands`);
    } catch (e: any) {
      console.warn('[ERROR DELETE] Error: ', e?.message || e)
      message.open({type: 'error', content: 'Error remove'})
      setDeleting(false)
    }
  }

  return <Page
    title={'Brand'}
    headerActions={[{
      content: id ? 'Update' : 'Create',
      type: 'primary',
      disabled: deleting || loading,
      loading: saving,
      onAction: () => formRef.current.submit()
    }, {
      content: 'Delete',
      disabled: saving || loading || !id,
      danger: true,
      loading: deleting,
      confirmTitle: "Are you sure?",
      isConfirmed: true,
      onAction: onDelete
    }]}>

    <Form
      ref={formRef}
      disabled={loading || saving}
      name="brand"
      onFinish={(values: any) => id ? onUpdate(values) : onCreate(values)}
      fields={brand ? Object.entries(brand).map(([name, value]) => ({name, value})) : []}
      autoComplete="off"
    >
      <div className={'flex gap-4 justify-between flex-wrap'}>

        <div className={'flex-grow w-7/12'}>
          <Card>
            <Form.Item name='name' rules={[{required: true}]}>
              <Input placeholder={'Name'}/>
            </Form.Item>
            <Form.Item name='description' className={'m-0'}>
              <Input placeholder={'Description'}/>
            </Form.Item>
          </Card>
        </div>

        <div className={'flex-grow min-w-40'}>
          <UsersPicker
            disabled={loading || deleting || saving || !id}
            selectedItems={brand?.user ? [brand.user] : []}
            onRemove={async () => await onUpdate({user: {disconnect: true}})}
            onChoose={async (items: UsersModel[]) => {
              if (items?.length && id) await onUpdate({user: {connect: {id: items[0].id}}})
            }}
          />
        </div>

      </div>
    </Form>
  </Page>
}
