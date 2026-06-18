export interface NavItem {
  id: string | number
  label: string
  href: string
  order: number
  isExternal?: boolean
  isActive?: boolean
}
