'use client'

import {Container, Stack, TextField, Button, Alert, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {createUser} from "@/services/Users";
import {signIn} from "next-auth/react";

export default function RegisterTemplate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    const user = await createUser({email, password});
    if (user) {
      const response = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: '/'
      });
    }
    console.log('user => ', user);
  }

  return <Container maxWidth="sm" style={{padding: '20px'}}>
    <Stack spacing={2}>
      <Typography variant="h3" component="h2" align={'center'}>
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
      <Button onClick={onRegister}>Send</Button>
    </Stack>
  </Container>
}
