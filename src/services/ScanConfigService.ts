
import AppConfig from "../config";
import { ScanRequest } from "../json/scanrequest/ScanRequest";


const SERVICE_URL: string  = AppConfig.SCANCONFIG_SERVICE_URL
export default class ScanConfigService {
    static getScanConfig(): Promise<ScanRequest> {
        return fetch(`${SERVICE_URL}/getScanConfig.php`)
            .then(response => response.json())
            .then(scanRequestConfigJson => {
                return Object.assign(new ScanRequest(), scanRequestConfigJson) as ScanRequest
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    static saveScanConfig(scanConfig: ScanRequest): Promise<void> {
        return fetch(`${SERVICE_URL}/setScanConfig.php`, {
            method: "POST",
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