
interface GenericType {
    name: string
    url: string
}

interface Types {
    slot: number
    type: GenericType
    names?: Names[]
}

interface Names {
    name: string
    language: GenericType
}

export { GenericType, Types, Names}