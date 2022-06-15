import { ScanResult } from "../json/scanresult/ScanResult";
import { ScanResultItem } from "./ScanResultItem";

export module ScanResultToItemsConverter {
    export function convertScanResultToItems(scanResult: ScanResult): ScanResultItem[] {
        const items : ScanResultItem[] = []
        for (const patternName in scanResult.function)
            items.push({patternName: patternName, patternType: "Function", value: scanResult.function[patternName]})

        for (const patternName in scanResult.returnaddress)
            items.push({patternName: patternName, patternType: "ReturnAddress", value: scanResult.returnaddress[patternName]})

        for (const patternName in scanResult.offset)
            items.push({patternName: patternName, patternType: "Offset", value: scanResult.offset[patternName]})

        for (const patternName in scanResult.vfunc)
            items.push({patternName: patternName, patternType: "VFunc", value: scanResult.vfunc[patternName]})

        return items
    }
}