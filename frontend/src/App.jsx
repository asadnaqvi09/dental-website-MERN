import React from 'react';
import Router from './routes/Router';
import CustomCursor from './components/common/CustomCursor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <CustomCursor />
            <Router />
            <ToastContainer position="top-right" autoClose={4000} />
        </div>
    );
}

export default App;
