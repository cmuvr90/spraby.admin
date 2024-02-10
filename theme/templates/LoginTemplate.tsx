'use client'

import {Container} from "@mui/material";
import LoginForm from "@/theme/snippets/LoginForm";

export default function LoginTemplate() {
  return <Container maxWidth="sm" style={{padding: '20px', maxWidth: '300px'}}>
    <LoginForm/>
  </Container>
}
