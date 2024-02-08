'use client'

import {Alert, Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {createUser} from "@/services/Users";

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onRegister = async () => {
    setLoading(true);
    const user = await createUser({email, password});
    let error = null;

    if (user) {
      const response = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false,
        callbackUrl: '/'
      });

      if (response?.ok && response?.url) {
        router.push('/');
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

  return <Stack spacing={2}>
    <Typography variant="h4" component="h2" align={'center'}>
      Sing up
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
    <Button onClick={onRegister} disabled={loading || !email.length || !password.length}>
      {loading ? <CircularProgress size={20}/> : 'Send'}
    </Button>
    {
      error && <Alert severity="error">{error}</Alert>
    }
  </Stack>
}
