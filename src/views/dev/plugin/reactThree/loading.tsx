import './loading.less'
interface definedProps {
  id: string
  display: string
  none: string
}

const Loading = (props: definedProps) => {
  const { id, display, none } = props
  return (
    <div className="loading_container" id={none}>
      <div id={display}>
        正在加载模型请稍等：
        <span id={id}></span>
        <div className="jinDu-con">
          <div id="jinDu"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
