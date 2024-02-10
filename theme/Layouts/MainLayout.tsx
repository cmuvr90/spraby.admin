'use client'

import React, {ReactNode, useEffect, useState} from 'react';

const MainLayout = ({children}: { children: ReactNode }) => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    })
  }, [])

  return <div style={{opacity, transition: '1s opacity'}}>
    {children}
  </div>
};

export default MainLayout;
