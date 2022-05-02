declare global {
  const IS_NODE: boolean
  const randomUUID: () => string
  const _nodeShim: any
}

export {}
