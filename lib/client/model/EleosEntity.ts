class EleosEntity {
    get id(): string {
        throw new Error('Method not implemented. Child Needs to implement this method');
     }

    get display(): string {
       throw new Error('Method not implemented. Child Needs to implement this method');
    }
}

export default EleosEntity
