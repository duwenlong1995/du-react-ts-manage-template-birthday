/**
 * handleData
 */
export const handleData = (Template: {}, PageNodeConfig: {}, LayOut: { key: string }[]) => {
  let layOutArr = LayOut.map((item) => {
    return item.key
  })
  const sortedObj = {}

  layOutArr.forEach((key) => {
    sortedObj[key] = PageNodeConfig[key]
  })

  Object.keys(Template).forEach((key) => {
    if (PageNodeConfig[key].key === key) {
      PageNodeConfig[key].props.value = Template[key]
    }
  })

  return sortedObj
}
