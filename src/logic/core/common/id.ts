import {v4 as uuid} from 'uuid'

export class Id {
    static new() {
        return uuid()
    }
}