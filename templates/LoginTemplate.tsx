'use client'

import {Container, Stack, TextField, Button, Typography} from "@mui/material";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from 'next/navigation';

export default function LoginTemplate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onRegister = async () => {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/'
    });

    console.log('response => ', response)

    if (response?.ok && response?.url) router.push('/');
  }

  return <Container maxWidth="sm" style={{padding: '20px'}}>
    <Stack spacing={2}>
      <Typography variant="h3" component="h2" align={'center'}>
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
      <Button onClick={onRegister}>Login</Button>
    </Stack>
  </Container>
}
