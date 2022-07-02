import AppConfig from "../config";

const SERVICE_URL: string  = AppConfig.SCAN_MANAGEMENT_URL
export module ScanManagement {

    export function isScanRunning(): Promise<boolean> {
        return fetch(`${SERVICE_URL}/isScanRunning`)
            .then(response => {
                return response.text().then(text => {
                    return text === "true"
                })
            })
            .catch(error => Promise.reject(error))
    }

    export function startRescan(): Promise<void> {
        return fetch(`${SERVICE_URL}/csgoUpdate`, {
            method: "POST"
        })
        .then(response => {
            if (response.ok)
                return Promise.resolve()
            return Promise.reject()
        })
        .catch((error) => {
            return Promise.reject(error)
        })
    }
}