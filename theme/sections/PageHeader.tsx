'use client'

import React, {useState} from "react";
import {Button, Popconfirm, Typography} from 'antd';
import type {ButtonType} from "antd/es/button/buttonHelpers";

/**
 *
 * @param title
 * @param actions
 * @constructor
 */
export default function PageHeader({title, actions}: Props) {

  return <div className={'flex justify-between items-center w-full gap-5'}>
    {
      title && <Typography.Text className={'text-2xl m-0'}>{title}</Typography.Text>
    }
    <div className={'flex gap-3 justify-center items-center'}>
      {
        (actions ?? []).map(i => <ActionMarkup action={i}/>)
      }
    </div>
  </div>
}

/**
 *
 * @param action
 * @constructor
 */
function ActionMarkup({action}: { action: Action }) {
  const markup = <Button
    danger={action.danger}
    disabled={action.disabled}
    loading={action.loading}
    type={action.type}
    onClick={!action.isConfirmed ? action.onAction : undefined}
  >
    {action.content}
  </Button>

  return !!action.isConfirmed ? <Popconfirm
    title={action.confirmTitle}
    description={action.confirmDescription}
    okText="Yes"
    cancelText="No"
    onConfirm={action.onAction}
  >{markup}</Popconfirm> : markup
}


type Props = {
  title?: string
  actions?: Action[]
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
