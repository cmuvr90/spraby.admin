'use client'

import React, {useEffect, useRef, useState} from "react";
import {PageParams} from "@/types";
import {Button, Card, Form, Input, message} from "antd";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {findFirst, update, create, removeOne} from "@/services/Options";
import {OptionsModel} from "@/prisma/types";
import Prisma from "@/prisma/types";
import {useRouter} from "next/navigation";
import {Page} from "@/theme/sections";

/**
 *
 * @param params
 * @constructor
 */
export default function OptionPage({params}: PageParams) {
  const id = params.id;
  const formRef = useRef<any>();
  const router = useRouter();
  const [option, setOption] = useState<OptionsModel>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      onGetOption(id).then()
    } else {
      setLoading(false)
    }
  }, [id]);

  /**
   *
   * @param id
   */
  const onGetOption = async (id: string) => {
    setLoading(true);
    const option = await findFirst({where: {id}})
    if (option) setOption(option);
    setLoading(false);
  }

  /**
   *
   * @param data
   */
  const onUpdate = async (data: Prisma.OptionsUpdateInput) => {
    setSaving(true);
    try {
      const option = await update({where: {id}, data})
      if (!option) throw Error();
      setOption(option);
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
  const onCreate = async (data: Prisma.OptionsCreateInput) => {
    setSaving(true);
    try {
      const option = await create({data})
      if (!option) throw Error();
      message.open({type: 'success', content: 'Created'})
      router.push(`/admin/options/${option.id}`);
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
      router.push(`/admin/options`);
    } catch (e: any) {
      console.warn('[ERROR DELETE] Error: ', e?.message || e)
      message.open({type: 'error', content: 'Error remove'})
      setDeleting(false)
    }
  }

  return <Page
    title={'Option'}
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
      name="option"
      onFinish={(values: any) => id ? onUpdate(values) : onCreate(values)}
      fields={option ? Object.entries(option).map(([name, value]) => ({name, value})) : []}
      autoComplete="off"
    >
      <div className={'flex gap-4 flex-col'}>
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
        <Card>

          <Form.List name={'values'}>
            {(fields, {add, remove}, {errors}) => (
              <>
                {
                  fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <div className={'flex flex-nowrap gap-5'}>
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange']}
                          rules={[{required: true}]}
                          noStyle
                        >
                          <Input placeholder="passenger name"/>
                        </Form.Item>

                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </Form.Item>
                  ))
                }
                <div className={'flex w-full justify-end'}>
                  <Form.Item noStyle>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}> Add Value </Button>
                    <Form.ErrorList errors={errors}/>
                  </Form.Item>
                </div>
              </>
            )}
          </Form.List>
        </Card>
      </div>
    </Form>
  </Page>
}
