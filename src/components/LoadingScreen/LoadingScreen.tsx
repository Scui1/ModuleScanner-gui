import * as React from "react";
import "./LoadingScreen.css"

const LoadingScreen = () => {

    return (
        <div className="LoadingScreenComponent">
            <div className="loader">
                <div className="loader-inner">
                    <div className="loader-line-wrap">
                        <div className="loader-line"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen