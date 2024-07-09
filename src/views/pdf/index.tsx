import React, { useEffect } from 'react'
import { obj } from '@/views/pdf/pdfOne'
import PdfText from './components/PdfText'
import PdfContainer from './components/PdfContainer'
import { handleData } from '@/views/pdf/utils'
import './index.scss'
import { Table } from 'antd'
import { CommonList } from '@/config/api/data'

const PdfOneComponent = () => {
  const { Template, PageNodeConfig, Decision, LayOut, MockData, styles } = obj
  const data = handleData(Template, PageNodeConfig, LayOut)
  let Data = Object.values(data)
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ]
  const getData = () => {
    const params = ['gouya']
    CommonList(params).then((res: any) => {
      console.log('res::: ', res)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  const pdfContent = () => {
    return (
      <>
        {Data.map((item: any) => {
          const render_style = item?.className
          if (item.type === 'Text' || item.type === 'Template') {
            return <PdfText classStyle={styles} styles={render_style} config={item} key={item.key} />
          } else if (item.type === 'Table') {
            return <Table dataSource={dataSource} columns={columns} key={item.key} />
          }
        })}
      </>
    )
  }
  return (
    <>
      <div className="pdf_container_main">
        <PdfContainer con={pdfContent}></PdfContainer>
      </div>
    </>
  )
}

export default PdfOneComponent
