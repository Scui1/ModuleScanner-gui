import { Module } from "../json/scanrequest/Module";
import { Pattern } from "../json/scanrequest/Pattern";
import { ScanRequest } from "../json/scanrequest/ScanRequest";
import { ScanResult } from "../json/scanresult/ScanResult";
import AppConfig from "../config";


const SERVICE_URL: string  = AppConfig.SCAN_SERVICE_URL
export module ScanService {
    
    export function scan(scanRequest: ScanRequest): Promise<ScanResult> {
        return fetch(`${SERVICE_URL}/executeScan`, {
            method: "POST",
            body: JSON.stringify(scanRequest),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            if (response.ok)
                return response.json()

            return response.text().then(errorText => {
                throw new Error(errorText)
            })
        })
        .then(result => {
            return result as ScanResult
        })
        .catch((error) => {
            return Promise.reject(error)
        })
    }

    export function scanPattern(moduleName: string, pattern: Pattern): Promise<ScanResult> {

        const module = new Module()
        module.name = moduleName
        module.patterns.push(pattern)

        const scanRequest = new ScanRequest()
        scanRequest.modules = [module]

        return scan(scanRequest)
    }

}
