export type BaseEntity = {
    id: string | number
}

export type Actions = {
    view?: boolean
    edit?: boolean
    delete?: boolean
    add?: boolean
    link: string
}

export type DataKeys<T> = {
    keys: (keyof T)[]
    headers: string[]
}