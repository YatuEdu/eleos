class EleosEntity {

    get display(): string {
       throw new Error('display method not implemented. Child Needs to implement this method');
    }

    get signature(): string {
        throw new Error('signature method not implemented. Child Needs to implement this method');
     }
}

export default EleosEntity
