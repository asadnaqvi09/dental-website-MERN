import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket/socket';
import { fetchServices } from '../../redux/features/services/servicesSlice';
import { fetchAppointments } from '../../redux/features/appointments/appointmentsSlice';
import { fetchContacts } from '../../redux/features/contacts/contactsSlice';

function RealtimeSync() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const refreshAppointments = () => {
            if (user) dispatch(fetchAppointments());
        };

        const onServicesChanged = () => dispatch(fetchServices());
        const onAppointmentCreated = () => refreshAppointments();
        const onAppointmentsUpdated = () => refreshAppointments();
        const onAppointmentsExpired = () => refreshAppointments();
        const onContactCreated = () => {
            if (user) dispatch(fetchContacts());
        };
        const onContactDeleted = () => {
            if (user) dispatch(fetchContacts());
        };

        socket.on('services:changed', onServicesChanged);
        socket.on('appointment:created', onAppointmentCreated);
        socket.on('appointments:updated', onAppointmentsUpdated);
        socket.on('appointments:expired', onAppointmentsExpired);
        socket.on('contact:created', onContactCreated);
        socket.on('contact:deleted', onContactDeleted);

        return () => {
            socket.off('services:changed', onServicesChanged);
            socket.off('appointment:created', onAppointmentCreated);
            socket.off('appointments:updated', onAppointmentsUpdated);
            socket.off('appointments:expired', onAppointmentsExpired);
            socket.off('contact:created', onContactCreated);
            socket.off('contact:deleted', onContactDeleted);
        };
    }, [dispatch, user]);

    return null;
}

export default RealtimeSync;
