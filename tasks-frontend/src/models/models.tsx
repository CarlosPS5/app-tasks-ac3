export interface login {
    username: string,
    password: string
}

export interface registro {
    username: string,
    password: string,
    rol: string
}

export interface task {
    _id?:string,
    title: string,
    description: string,
    user?: string,
    is_public: boolean,
    created_at?: string,
    updated_at?: string
}
