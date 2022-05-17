import { Action } from "./Action"

export class Pattern {
    name: String
    type: String
    actions: Action[]
    constructor(name: String, type: String, actions: Array<Action>) {
        this.name = name
        this.type = type
        this.actions = actions
    }
}