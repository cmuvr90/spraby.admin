'use client'

import React, {useEffect, useRef, useState} from "react";
import {PageParams} from "@/types";
import {Card, Form, Input, message} from "antd";
import {findFirst, update, create, removeOne} from "@/services/Categories";
import {CategoriesModel, OptionsModel} from "@/prisma/types";
import Prisma from "@/prisma/types";
import {useRouter} from "next/navigation";
import {Page} from "@/theme/sections";
import OptionsPicker from "@/theme/snippets/OptionsPicker";

/**
 *
 * @param params
 * @constructor
 */
export default function CategoryPage({params}: PageParams) {
  const id = params.id;
  const formRef = useRef<any>();
  const router = useRouter();
  const [Category, setCategory] = useState<CategoriesModel>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      onGetCategory(id).then()
    } else {
      setLoading(false)
    }
  }, [id]);

  /**
   *
   * @param id
   */
  const onGetCategory = async (id: string) => {
    setLoading(true);
    const Category = await findFirst({where: {id}, include: {Options: true, Collections: true}})
    if (Category) setCategory(Category);
    setLoading(false);
  }

  /**
   *
   * @param data
   */
  const onUpdate = async (data: Prisma.CategoriesUpdateArgs['data']) => {
    setSaving(true);
    try {
      const Category = await update({where: {id}, data, include: {Options: true, Collections: true}})
      if (!Category) throw Error();
      setCategory(Category);
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
  const onCreate = async (data: Prisma.CategoriesCreateInput) => {
    setSaving(true);
    try {
      const Category = await create({data, include: {Options: true, Collections: true}})
      if (!Category) throw Error();
      message.open({type: 'success', content: 'Created'})
      router.push(`/admin/categories/${Category.id}`);
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
      await removeOne(id);
      message.open({type: 'success', content: 'Deleted'})
      router.push(`/admin/categories`);
    } catch (e: any) {
      console.warn('[ERROR DELETE] Error: ', e?.message || e)
      message.open({type: 'error', content: 'Error remove'})
      setDeleting(false)
    }
  }

  return <Page
    title={'Category'}
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
      name="Category"
      onFinish={(values: any) => id ? onUpdate(values) : onCreate(values)}
      fields={Category ? Object.entries(Category).map(([name, value]) => ({name, value})) : []}
      autoComplete="off"
    >
      <div className={'flex gap-4 justify-between flex-wrap'}>

        <div className={'flex-grow w-7/12'}>
          <Card>
            <Form.Item name='name' rules={[{required: true}]}>
              <Input placeholder={'Name'}/>
            </Form.Item>
            <Form.Item name='title' rules={[{required: true}]}>
              <Input placeholder={'Title'}/>
            </Form.Item>
            <Form.Item name='description' className={'m-0'}>
              <Input placeholder={'Description'}/>
            </Form.Item>
          </Card>
        </div>
        <div className={'flex-grow min-w-40'}>
          {
            <OptionsPicker
              disabled={loading || deleting || saving || !id}
              selectedItems={Category?.Options ?? []}
              onRemove={async (id) => await onUpdate({Options: {disconnect: {id}}})}
              onChoose={async (items: OptionsModel[]) => {
                await onUpdate({Options: {set: items.map(i => ({id: i.id}))}})
              }}
            />
          }
        </div>
      </div>
    </Form>
  </Page>
}
