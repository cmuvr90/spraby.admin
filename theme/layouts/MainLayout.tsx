'use client'

import React, {ReactNode, useEffect, useState} from 'react';
import {SessionProvider} from "next-auth/react";

const MainLayout = ({children}: { children: ReactNode }) => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    },300)
  }, [])

  return <SessionProvider>
    <div style={{opacity, transition: '1.3s opacity'}}>
      {children}
    </div>
  </SessionProvider>
};

export default MainLayout;
