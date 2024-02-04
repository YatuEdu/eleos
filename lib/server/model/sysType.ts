export type YatuRequest = {
    data: unknown,
    code: number,
    err: string
}

export type YatuResponse = {
    dataSize?:  number,
    data:       unknown,
    ok:         boolean,
    error?: {
        code: number,
        message: string
    }
}