import notifier from "../components/Notifications/Notifier";
import { Pattern } from "../json/scanrequest/Pattern";
import { ScanResult } from "../json/scanresult/ScanResult";
import ScanService from "../services/ScanService";

export module ScanResultDisplayer {
    export function scanAndDisplay(moduleName: string, pattern: Pattern): Promise<void> {
        return ScanService.scanPattern(moduleName, pattern)
        .then(result => displaySinglePatternScan(moduleName, pattern, result))
        .catch(error => {
            notifier.error(error?.toString())
        })
    }

    function displaySinglePatternScan(moduleName: string, pattern: Pattern, scanResult: ScanResult) {
        if (!scanResult)
            return
    
        const resultNumber = getResultForPattern(pattern, scanResult)
        if (!resultNumber) {
            const scanError = scanResult.errors.find(scanError => scanError.patternName === pattern.name)
            if (!scanError)
                notifier.error(`${pattern.name} failed. There was neither a result nor an error returned by the service, this shouldn't happen.`)
            else
                notifier.error(`${pattern.name} failed because:<br/> ${scanError.description}`)
        }
        else {
            notifier.success(getFormattedResultForPattern(moduleName, pattern, resultNumber))
        }
    }

    function getResultForPattern(pattern: Pattern, scanResult: ScanResult): number | null {
        switch (pattern.type.toLowerCase()) {
            case "function":
                return scanResult.function[pattern.name]
            case "returnaddress":
                return scanResult.returnaddress[pattern.name]
            case "offset":
                return scanResult.offset[pattern.name]
            case "index":
                return scanResult.vfunc[pattern.name]
        }
        return null
    }

    function getFormattedResultForPattern(moduleName: string, pattern: Pattern, result: number): string {
        const prefix = `${pattern.name} = `
        switch (pattern.type.toLowerCase()) {
            case "function":
            case "returnaddress":
                return `${prefix}${moduleName} + <strong>0x${result.toString(16).toUpperCase()}</strong><br/>
                    With a module base of 0x10000000 this would be <strong>0x${(0x10000000 + result).toString(16).toUpperCase()}</strong>`
            case "offset":
                return `${prefix}<strong>0x${result.toString(16).toUpperCase()}</strong>`
            case "index":
                return `${prefix}<strong>${result.toString()}</strong>`
        }
        return ""
    }
}