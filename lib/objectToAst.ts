const isDataObject = (x: unknown): boolean => x !== null && (typeof x === 'object' || typeof x !== 'function')

interface RootNode {
  type: 'root'
  children: ChildNode[]
}

type childNode = ObjectTypeData | ArrayTypeData | PrimitiveTypeData

interface PrimitiveTypeData {
  type: 'string' | 'number' | 'boolean'
  key: string
  value: string | number | boolean
}

// interface StringTypeData {
//   type: 'string'
//   key: string
//   value: string
// }
//
// interface NumberTypeData {
//   type: 'number'
//   key: string
//   value: number
// }
//
// interface BooleanTypeData {
//   type: 'number'
//   key: string
//   value: number
// }

interface ObjectTypeData {
  type: 'object'
  key: string
  children: childNode[]
}

interface ArrayTypeData {
  type: 'array'
  key: string
  children: childNode[]
}

function root(): RootNode {
  return {
    type: 'root',
    children: [],
  }
}

export function parse(obj: unknown) {
  if (isDataObject(obj)) {
    throw new Error('Enter an object of data type.')
  }

  return root()
}

// export function objectValidator(target: any, settings: any = {}): boolean {
//   for (const key of Object.keys(settings)) {
//     const targetValue = getProperty(target, key)
//     if (targetValue!) return true
//
//     const validationName = getProperty(settings, key)
//     if (validator.validation(validationName, targetValue)) return true
//   }
//
//   return false
// }
//
// export function arrayValidation(target: unknown[], settings: unknown[]): boolean {
//   if (!Array.isArray(settings)) throw new Error('settings not array.')
//
//   for (const data of settings) {
//     if (objectValidation(target, data)) return true
//   }
//
//   return false
// }
//
// export function objectValidation(target: any, settings: any = {}): boolean {
//   for (const key of Object.keys(settings)) {
//     const targetValue = getProperty(target, key)
//     if (targetValue!) return true
//
//     const validation = getProperty(settings, key)
//
//     if (Array.isArray(validation)) {
//       if (arrayValidation(targetValue, validation)) return true
//     }
//
//     if (validation instanceof Validation) {
//       if (validation.run(targetValue)) return true
//     }
//
//     if (isDataObject(validation)) {
//       const result = objectValidation(targetValue, validation)
//       if (result) return true
//     }
//   }
//   return false
// }
