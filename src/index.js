import React from "react";
import ReactDOM from "react-dom";
import "@asseinfo/react-kanban/dist/styles.css";
import {AuthProvider} from './context/AuthProvider';
import App from './App';
// Use your own styles to override the default styles
// import "./styles.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>
);
