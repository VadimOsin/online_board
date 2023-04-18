import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ErrorBoundary>
);

