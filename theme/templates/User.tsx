'use client'

import React, {useEffect, useState} from "react";
import {PageParams} from "@/types";
import {Button, Flex, Form, Input} from "antd";
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
  const onSave = async (values: Prisma.UsersUpdateInput) => {
    setLoading(true);
    const user = await update({where: {id}, data: values})
    if (user) setUser(user);
    setLoading(false);
  }

  return <div style={{maxWidth: '400px', margin: '0 auto'}}>
    <Form
      disabled={loading}
      name="user"
      onFinish={onSave}
      fields={user ? Object.entries(user).map(([name, value]) => ({name, value})) : []}
      autoComplete="off"
    >
      <Form.Item<Prisma.UsersUpdateInput> name="firstName">
        <Input placeholder={'First name'}/>
      </Form.Item>

      <Form.Item<Prisma.UsersUpdateInput> name="lastName">
        <Input placeholder={'Last name'}/>
      </Form.Item>

      <Form.Item<Prisma.UsersUpdateInput> name="email">
        <Input placeholder={'Email'} type={'email'}/>
      </Form.Item>

      <Form.Item>
        <Flex justify={'flex-end'}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  </div>
}
