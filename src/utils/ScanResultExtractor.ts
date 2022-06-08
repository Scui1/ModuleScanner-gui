import { ScanResult } from "../json/scanresult/ScanResult";

export module ScanResultExtractor {
    export function getContainerForPatternType(patternType: string, scanResult: ScanResult): Record<string, number> | null {
        switch (patternType.toLowerCase()) {
            case "function":
                return scanResult.function
            case "returnaddress":
                return scanResult.returnaddress
            case "offset":
                return scanResult.offset
            case "index":
                return scanResult.vfunc
        }
        return null
    }
}