import { Module } from "./Module"

export class ScanRequest {
    modulePath: String
    modules: Module[]
    constructor(modulePath: String, modules: Array<Module>) {
        this.modulePath = modulePath
        this.modules = modules
    }
}