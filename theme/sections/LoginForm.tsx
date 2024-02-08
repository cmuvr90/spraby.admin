'use client'

import {Button, Stack, TextField, Typography, CircularProgress, Alert} from "@mui/material";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onLogin = async () => {
    setLoading(true);
    const response = await signIn('credentials', {
      email,
      password,
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

  return <Stack spacing={2}>
    <Typography variant="h4" component="h2" align={'center'}>
      Sing in
    </Typography>
    <TextField
      label="Email"
      variant="standard"
      onChange={(e: any) => setEmail(e.target.value)}
      value={email}
    />
    <TextField
      label="Password"
      variant="standard"
      type={'password'}
      onChange={(e: any) => setPassword(e.target.value)}
      value={password}
    />
    <Button onClick={onLogin} disabled={loading || !email.length || !password.length}>
      {loading ? <CircularProgress size={20}/> : 'Login'}
    </Button>
    {
      error && <Alert severity="error">{error}</Alert>
    }
  </Stack>
}
