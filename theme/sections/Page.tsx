'use client'

import React, {ReactNode} from "react";
import PageHeader from "@/theme/sections/PageHeader";
import PageContent from "@/theme/sections/PageContent";
import PageFooter from "@/theme/sections/PageFooter";
import type {ButtonType} from "antd/es/button/buttonHelpers";

/**
 *
 * @param title
 * @param headerActions
 * @param children
 * @constructor
 */
export default function Page({title, headerActions, children}: Props) {
  return <div className={'flex w-full flex-col gap-4 max-w-[1000px] my-0 mx-auto'}>
    {
      (!!title || !!headerActions?.length) && <PageHeader title={title} actions={headerActions}/>
    }
    <PageContent>
      {children}
    </PageContent>
    <PageFooter/>
  </div>
}

type Props = {
  title?: string
  headerActions?: Action[]
  children: ReactNode
}

type Action = {
  content: string
  onAction: () => any
  loading?: boolean
  disabled?: boolean
  danger?: boolean
  confirmTitle?: string,
  confirmDescription?: string,
  isConfirmed?: boolean,
  type?: ButtonType
}
