import { ScanResult } from "../json/scanresult/ScanResult";

export module ScanResultExtractor {
    export function getContainerForPattern(moduleName: string, patternType: string, scanResult: ScanResult): Record<string, number> | null {
        switch (patternType.toLowerCase()) {
            case "function":
                return scanResult.function[moduleName]
            case "address":
                return scanResult.address[moduleName]
            case "offset":
                return scanResult.offset
            case "index":
                return scanResult.vfunc
        }
        return null
    }
}