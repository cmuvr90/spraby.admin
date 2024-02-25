'use client'

import React, {ReactNode} from "react";

/**
 *
 * @param children
 * @constructor
 */
export default function PageFooter({children}: { children?: ReactNode }) {
  return <div className={'w-full'}>
    {children}
  </div>
}
