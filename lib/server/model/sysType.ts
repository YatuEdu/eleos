export type YatuRequest = {
    data: unknown,
    code: number,
    err: string
}

export type YatuResponse = {
    payload: unknown,
    ok:      boolean,
    error?: {
        code: number,
        message: string
    }
}