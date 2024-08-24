import { ScanResult } from "../json/scanresult/ScanResult";
import { ScanResultItem } from "./ScanResultItem";

export module ScanResultToItemsConverter {
    export function convertScanResultToItems(scanResult: ScanResult): ScanResultItem[] {
        const items : ScanResultItem[] = []
        for (const moduleName in scanResult.function) {
            for (const patternName in scanResult.function[moduleName])
                items.push({moduleName: moduleName, patternName: patternName, patternType: "Function", value: scanResult.function[moduleName][patternName]})
        }

        for (const moduleName in scanResult.address) {
            for (const patternName in scanResult.address[moduleName])
                items.push({moduleName: moduleName, patternName: patternName, patternType: "Address", value: scanResult.address[moduleName][patternName]})
        }

        for (const patternName in scanResult.offset)
            items.push({moduleName: "", patternName: patternName, patternType: "Offset", value: scanResult.offset[patternName]})

        for (const patternName in scanResult.vfunc)
            items.push({moduleName: "", patternName: patternName, patternType: "VFunc", value: scanResult.vfunc[patternName]})

        return items
    }
}