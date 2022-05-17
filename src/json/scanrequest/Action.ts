export class Action {
    type: String
    arguments: String[]
    constructor(type: String, args: Array<String>) {
        this.type = type
        this.arguments = args
    }
}