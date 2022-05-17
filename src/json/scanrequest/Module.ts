import { Pattern } from "./Pattern"

export class Module {
    name: String
    patterns: Pattern[]
    constructor(name: String, patterns: Array<Pattern>) {
        this.name = name
        this.patterns = patterns
    }
}