import { ReactNode, useState } from 'react'
import './index.scss'

interface DialogProps {
  children?: ReactNode
  className?: string
  draggable?: boolean
  open?: boolean
}
const Dialog = ({ children, className, draggable, open }: DialogProps) => {
  return (
    <>
      <dialog className={className} draggable={draggable} open={open}>
        <header>Title</header>
        {children}
        <footer>
          <button onClick={() => {}}>取消</button>
          <button>确认</button>
        </footer>
      </dialog>
    </>
  )
}
export default Dialog
