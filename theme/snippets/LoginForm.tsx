'use client'

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {App, Button, Form, Input} from 'antd';
import {signIn} from "next-auth/react";

export default function LoginForm() {
  const {message} = App.useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error?.length) message.error(error, 2);
  }, [error]);

  const onLogin = async (values: { email: string, password: string }) => {
    setLoading(true);
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
    });
    if (response?.ok && response?.url) {
      if (window.location) {
        window.location.href = window.location.origin;
      } else {
        router.prefetch('/');
      }
    } else {
      setError('Incorrect login or password');
      setLoading(false);
      setTimeout(() => setError(null), 3000)
    }
  }

  return <Form
    name="login"
    onFinish={onLogin}
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
        Sign in
      </Button>
    </Form.Item>
  </Form>
}

type FieldType = {
  email?: string;
  password?: string;
};
