import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './routes/Router';
import CustomCursor from './components/common/CustomCursor';
import RealtimeSync from './components/common/RealtimeSync';
import { ToastContainer } from 'react-toastify';
import { fetchCurrentAdmin } from './redux/features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentAdmin());
    }, [dispatch]);

    return (
        <div>
            <CustomCursor />
            <RealtimeSync />
            <Router />
            <ToastContainer position="top-right" autoClose={4000} />
        </div>
    );
}

export default App;
