export interface RootNode {
  type: 'root'
  children: childNode[]
}

export type childNode = ObjectTypeData | ArrayTypeData | PrimitiveTypeData
export type dataObject = Record<string, unknown>

export interface PrimitiveTypeData {
  type: 'string' | 'number' | 'boolean'
  key: string
  value: string | number | boolean
}

export interface ObjectTypeData {
  type: 'object'
  key: string
  children: childNode[]
}

export interface ArrayTypeData {
  type: 'array'
  key: string
  children: childNode[]
}
