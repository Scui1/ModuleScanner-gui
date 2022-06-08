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
}