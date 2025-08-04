export type BaseEntity = {
    id: string | number
    [key: string]: any  // Allow additional properties
}

export type Actions = {
    view?: boolean
    edit?: boolean
    delete?: boolean
    add?: boolean
    link: string
}

export type DataKeys<T = any> = {
    keys: (keyof T | string)[]  // Allow both typed keys and string keys
    headers: string[]
}