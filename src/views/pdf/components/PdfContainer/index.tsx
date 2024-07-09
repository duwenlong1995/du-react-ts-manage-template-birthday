import React from 'react'
import { memo } from 'react'
import './index.scss'

interface PdfContainerProps {
  con: () => JSX.Element
}

const PdfContainer: React.FC<PdfContainerProps> = memo((props) => {
  const renderContent = props.con
  return <div className="pdf_container">{renderContent()}</div>
})

export default PdfContainer
