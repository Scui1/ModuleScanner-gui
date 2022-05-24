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
                notifier.error(`${pattern.name} failed. Error description: ${scanError.description}`)

        }
        else {
            notifier.success(`${pattern.name} = ${moduleName} + 0x${resultNumber.toString(16)}`)
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
}