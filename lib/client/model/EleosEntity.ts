const MIN_ID = 299999

class EleosEntity {
      private static  _idCounter = MIN_ID
      protected _entityId: number
   
      constructor() {
         this._entityId = EleosEntity._idCounter ++
      }
   
      get entityId(): number {
         return this._entityId
      }
   
      get display(): string {
         throw new Error('display method not implemented. Child Needs to implement this method')
      }
   
      get signature(): string {
         throw new Error('signature method not implemented. Child Needs to implement this method')
      }
}

export default EleosEntity
