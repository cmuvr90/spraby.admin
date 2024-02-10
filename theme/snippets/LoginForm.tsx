'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Form, Input} from 'antd';
import {signIn} from "next-auth/react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onLogin = async (values: { email: string, password: string }) => {
    setLoading(true);
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    });
    if (response?.ok && response?.url) {
      router.push('/');
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
