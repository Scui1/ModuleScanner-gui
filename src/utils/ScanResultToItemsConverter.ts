import { ScanResult } from "../json/scanresult/ScanResult";
import { ScanResultItem } from "./ScanResultItem";

export module ScanResultToItemsConverter {
    export function convertScanResultToItems(scanResult: ScanResult): ScanResultItem[] {
        const items : ScanResultItem[] = []
        for (const patternName in scanResult.function)
            items.push({patternName: patternName, patternType: "function", value: scanResult.function[patternName]})

        for (const patternName in scanResult.returnaddress)
            items.push({patternName: patternName, patternType: "returnaddress", value: scanResult.returnaddress[patternName]})

        for (const patternName in scanResult.offset)
            items.push({patternName: patternName, patternType: "offset", value: scanResult.offset[patternName]})

        for (const patternName in scanResult.vfunc)
            items.push({patternName: patternName, patternType: "vfunc", value: scanResult.vfunc[patternName]})

        return items
    }
}