import React from "react";

const ErrorPage = ({ message }) => {
    return (
        <div className="error_page">
            <h1>{message}</h1>
        </div>
    );
};

export default ErrorPage;
