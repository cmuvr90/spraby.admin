'use client'

import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {createUser} from "@/services/Users";
import {App, Form, Input, Button} from "antd";

export default function RegisterForm() {
  const {message} = App.useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error?.length) message.error(error, 2);
  }, [error]);

  const onRegister = async (values: { email: string, password: string }) => {
    setLoading(true);
    const user = await createUser(values);
    let error = null;

    if (user) {
      const response = await signIn('credentials', {
        ...values,
        redirect: false,
      });

      if (response?.ok && response?.url) {
        router.push(`/${user.role}`);
      } else {
        error = 'Incorrect login or password'
      }
    } else {
      error = 'Error create user'
    }

    if (error) {
      setError(error);
      setLoading(false);
      setTimeout(() => setError(null), 3000)
    }
  }

  return <Form
    name="login"
    onFinish={onRegister}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      name="email"
      rules={[{required: true, message: 'Is required'}]}
    >
      <Input placeholder={'Email'}/>
    </Form.Item>

    <Form.Item<FieldType>
      name="password"
      rules={[{required: true, message: 'Is required'}]}
    >
      <Input.Password placeholder={'Password'}/>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" block loading={loading}>
        Register
      </Button>
    </Form.Item>
  </Form>
}

type FieldType = {
  email?: string;
  password?: string;
};
