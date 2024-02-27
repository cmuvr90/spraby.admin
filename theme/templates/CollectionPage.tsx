'use client'

import React, {useEffect, useRef, useState} from "react";
import {PageParams} from "@/types";
import {Card, Form, Input, message} from "antd";
import {findFirst, update, create, removeOne} from "@/services/Collections";
import {CategoriesModel, CollectionsModel} from "@/prisma/types";
import Prisma from "@/prisma/types";
import {useRouter} from "next/navigation";
import {Page} from "@/theme/sections";
import CategoriesPicker from "@/theme/snippets/CategoriesPicker";

/**
 *
 * @param params
 * @constructor
 */
export default function CollectionPage({params}: PageParams) {
  const id = params.id;
  const formRef = useRef<any>();
  const router = useRouter();
  const [collection, setCollection] = useState<CollectionsModel>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      onGetCollection(id).then()
    } else {
      setLoading(false)
    }
  }, [id]);

  /**
   *
   * @param id
   */
  const onGetCollection = async (id: string) => {
    setLoading(true);
    const collection = await findFirst({where: {id}, include: {Categories: true}})
    if (collection) setCollection(collection);
    setLoading(false);
  }

  /**
   *
   * @param data
   */
  const onUpdate = async (data: Prisma.CollectionsUpdateArgs['data']) => {
    setSaving(true);
    try {
      const collection = await update({where: {id}, data, include: {Categories: true}})
      if (!collection) throw Error();
      setCollection(collection);
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
  const onCreate = async (data: Prisma.CollectionsCreateInput) => {
    setSaving(true);
    try {
      const collection = await create({data, include: {Categories: true}})
      if (!collection) throw Error();
      message.open({type: 'success', content: 'Created'})
      router.push(`/admin/collections/${collection.id}`);
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
      router.push(`/admin/collections`);
    } catch (e: any) {
      console.warn('[ERROR DELETE] Error: ', e?.message || e)
      message.open({type: 'error', content: 'Error remove'})
      setDeleting(false)
    }
  }

  return <Page
    title={'Collection'}
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
      name="Collection"
      onFinish={(values: any) => id ? onUpdate(values) : onCreate(values)}
      fields={collection ? Object.entries(collection).map(([name, value]) => ({name, value})) : []}
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
            <CategoriesPicker
              disabled={loading || deleting || saving || !id}
              selectedItems={collection?.Categories ?? []}
              onRemove={async (id) => await onUpdate({Categories: {disconnect: {id}}})}
              onChoose={async (items: CategoriesModel[]) => {
                await onUpdate({Categories: {set: items.map(i => ({id: i.id}))}})
              }}
            />
          }
        </div>
      </div>
    </Form>
  </Page>
}
