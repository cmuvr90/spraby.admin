'use client'

import {Container} from "@mui/material";
import RegisterForm from "@/theme/snippets/RegisterForm";

export default function RegisterTemplate() {
  return <Container maxWidth="sm" style={{padding: '20px'}}>
    <RegisterForm/>
  </Container>
}
