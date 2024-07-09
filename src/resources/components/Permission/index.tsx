import React, { useState } from 'react'

type PermissionProps = {
  children: React.ReactNode
  access?: string | string[]
}

const useAuth = () => {
  const [user, setUser] = useState({
    username: 'example_user',
    permissions: ['read', 'write'],
  })
  if (!user) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return user
}

const Permission: React.FC<PermissionProps> = ({ children, access }) => {
  const childrenArray = React.Children.toArray(children)
  const { permissions } = useAuth()
  const showSlot = () => {
    if (!access) {
      return true
    }
    if (!permissions) {
      return false
    }
    if (Array.isArray(access)) {
      return access.every((p) => permissions.includes(p))
    } else {
      return permissions.includes(access)
    }
  }
  console.log(showSlot())

  return (
    <span style={{ display: showSlot() ? 'block' : 'none' }}>
      {childrenArray.map((item: any) => {
        return item
      })}
    </span>
  )
}
export default Permission
