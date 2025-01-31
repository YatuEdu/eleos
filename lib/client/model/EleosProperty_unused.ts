import EleosPerson 
                from "./EleosPerson"
               
class EleosProperty {
    private _name: string;
    private _type: string;
    private _owner: string;
    private _address: string;

    constructor(name: string, type: string, owner: string, address: string) {
        this._name = name;
        this._type = type;
        this._owner = owner;
        this._address = address;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get owner(): string {
        return this._owner;
    }

    set owner(value: string) {
        this._owner = value;
    }
}

export default EleosProperty;