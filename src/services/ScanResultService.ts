import ApplicationConfig from "../config";
import { ScanResult } from "../json/scanresult/ScanResult";

const SERVICE_URL: string  = ApplicationConfig.SCAN_RESULT_SERVICE_URL
export module ScanResultService {
    export function getScanResult(): Promise<ScanResult> {
        return fetch(`${SERVICE_URL}/getScanResult.php`)
            .then(response => response.json())
            .then(scanResultJson => {
                return Object.assign(new ScanResult(), scanResultJson) as ScanResult
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    export function saveScanResult(scanResult: ScanResult): Promise<void> {
        return fetch(`${SERVICE_URL}/setScanResult.php`, {
            method: "POST",
            body: JSON.stringify(scanResult),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                if (response.ok)
                    return Promise.resolve()

                return response.text().then(errorText => {
                    throw new Error(errorText)
                })
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}