import React, { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

const LoadingIndicator: React.FC = () => {
    const { loading } = useContext(LoadingContext);

    if (!loading) return null;

    return (
        <div className="loading-indicator">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingIndicator;
