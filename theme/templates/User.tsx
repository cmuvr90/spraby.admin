'use client'

import React, {useEffect, useState} from "react";
import {PageParams} from "@/types";
import {Button, Card, Form, Input, Typography} from "antd";
import {findById, update} from "@/services/Users";
import {UsersModel} from "@/prisma/types";
import Prisma from "@/prisma/types";

export default function User({params}: PageParams) {
  const id = params.id;
  const [user, setUser] = useState<UsersModel>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) onGetUser(id).then()
  }, [id]);

  /**
   *
   * @param id
   */
  const onGetUser = async (id: string) => {
    setLoading(true);
    const user = await findById(id)
    if (user) setUser(user);
    setLoading(false);
  }

  /**
   *
   * @param values
   */
  const onSave = async (values: UsersModel) => {
    setLoading(true);
    const user = await update({where: {id}, data: (values as Prisma.UsersUpdateInput)})
    if (user) setUser(user);
    setLoading(false);
  }

  return <Form
    disabled={loading}
    name="user"
    onFinish={onSave}
    fields={user ? Object.entries(user).map(([name, value]) => ({name, value})) : []}
    autoComplete="off"
  >
    <div className={'flex flex-col gap-3'}>
      <div className={'flex gap-3 justify-between items-center flex-wrap'}>
        <Typography.Title level={2} style={{margin: 0}}>User</Typography.Title>
        <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
      </div>
      <div className={'flex gap-3 justify-between flex-wrap'}>
        <Card loading={loading} className={'flex-grow min-w-60'}>
          <Form.Item<UsersModel> name="firstName">
            <Input placeholder={'First name'}/>
          </Form.Item>
          <Form.Item<UsersModel> name="lastName">
            <Input placeholder={'Last name'}/>
          </Form.Item>
          <Form.Item<UsersModel> name="email" style={{margin: 0}}>
            <Input placeholder={'Email'} type={'email'}/>
          </Form.Item>
        </Card>
      </div>
    </div>
  </Form>
}
