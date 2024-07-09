import { memo } from 'react'

const PdfText = memo((props: any) => {
  const { config } = props

  return (
    <>
      <div className="text_big" dangerouslySetInnerHTML={{ __html: config.props.value }} />
    </>
  )
})
export default PdfText
