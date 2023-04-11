
import AppConfig from "../config";
import { ScanRequest } from "../json/scanrequest/ScanRequest";


const SERVICE_URL: string  = AppConfig.SCAN_MANAGEMENT_URL
export module ScanConfigService {
    export function getScanConfig(): Promise<ScanRequest> {
        return fetch(`${SERVICE_URL}/getSavedScanRequest`)
            .then(response => response.json())
            .then(scanRequestConfigJson => {
                return Object.assign(new ScanRequest(), scanRequestConfigJson) as ScanRequest
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    export function saveScanConfig(scanConfig: ScanRequest): Promise<void> {
        return fetch(`${SERVICE_URL}/saveScanRequest`, {
            method: "PATCH",
            body: JSON.stringify(scanConfig),
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