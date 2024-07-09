import Icon from '@/resources/components/Icon'
import React, { memo, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { onClickOtherClose } from './utils'
import { Button } from 'antd'

type TabProps = {
  children: ReactNode[]
  backgroundColor?: string
  onChange?: (val: string) => void
  textLocation?: string
  width?: number
  disabled?: boolean
  defaultValue?: { label?: string; id?: number }
  type?: string
}
type inputValue = string | undefined
const SelectPro = memo(function SelectPro({
  children,
  backgroundColor,
  textLocation,
  width,
  disabled,
  defaultValue,
  type,
  onChange,
}: TabProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [inputValue, setInputValue] = useState<inputValue>('')

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
  const showMenu = (val: any) => {
    setIsMenuVisible(!isMenuVisible)
  }

  const onChangeInput = (e: any) => {
    setInputValue(e.target.value.label)
  }
  const onItemClick = (val: any) => {
    if (onChange) {
      onChange(val)
    }
    setInputValue(val.label)
    setIsMenuVisible(false)
  }

  // 使用 React.Children.map 遍历 children，为每个子元素添加 onItemClick 属性
  const renderedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onItemClick: onItemClick, // 添加 onItemClick 属性
        defaultValue: defaultValue,
      })
    }
    return child
  })

  const otherAreaRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
  // 监听页面点击事件，点击其他地方时关闭菜单
  onClickOtherClose(setIsMenuVisible, otherAreaRef, isMenuVisible)

  useEffect(() => {
    if (defaultValue) {
      const value = defaultValue.label
      setInputValue(value)
    }
  }, [defaultValue])
  const handleOpenMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }
  return (
    <div
      ref={otherAreaRef}
      className={styles.SelectPro_container}
      style={{ width: width, backgroundColor: type === 'input' ? '#fff' : 'none' }}>
      <div className={type === 'input' ? styles.SelectPro_selector : styles.SelectPro_selector_borderNone}>
        <span className={styles.SelectPro_selector_input}>
          {type === 'input' ? (
            <input
              type="text"
              style={{ textAlign: textLocation, cursor: disabled ? 'not-allowed' : 'pointer' }}
              ref={inputRef}
              value={inputValue}
              onChange={onChangeInput}
              onClick={showMenu}
              disabled={disabled}
            />
          ) : null}
          {type === 'button' ? (
            <Button type="primary" onClick={handleOpenMenu}>
              修改权限
            </Button>
          ) : null}
          {type === 'span' ? <span onClick={handleOpenMenu}>{inputValue}</span> : null}
        </span>
        <span className={styles.SelectPro_selector_icon} onClick={handleOpenMenu}>
          {type === 'input' || type === 'span' ? <Icon iconName="arrow_down" color="#999999" /> : null}
        </span>
      </div>
      {isMenuVisible && (
        <div className={styles.SelectPro_menu} style={{ backgroundColor: backgroundColor }}>
          {renderedChildren}
        </div>
      )}
    </div>
  )
})

export default SelectPro
