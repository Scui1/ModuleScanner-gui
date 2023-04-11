import { ScanError } from "./ScanError"

export class ScanResult {
    function: Record<string, Record<string, number>> = {}
    returnaddress: Record<string, Record<string, number>> = {}
    offset: Record<string, number> = {}
    vfunc: Record<string, number> = {}
    errors: Array<ScanError> = []
}