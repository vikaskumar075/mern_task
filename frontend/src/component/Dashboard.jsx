import { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, LogOut } from 'lucide-react';

const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    });
};

const statusIcon = {
    success: '✅',
    failed: '❌',
    pending: '⏳',
};
const Base_Url = import.meta.env.VITE_API_URL;
const Dashboard = () => {
    const [devices, setDevices] = useState([]);

    const fetchDevices = async () => {
        try {
            const res = await axios.get(`${Base_Url}/api/devices`);
            setDevices(res.data);
        } catch (err) {
            console.error('Failed to fetch devices:', err);
        }
    };

    const handleSync = async (deviceId) => {
        try {
            await axios.post(`${Base_Url}/api/devices/${deviceId}/sync`);
            fetchDevices();
        } catch (err) {
            alert('Sync failed');
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <div className="p-6">
            <header className="bg-[#6d0707] text-white p-4 text-xl font-bold shadow-md">
                PiSync Admin Dashboard
            </header>

            <div className="flex justify-between items-center mt-4 border-b pb-2">
                <div>
                    <button className="mr-4 font-semibold">Device Management</button>
                    <button className="font-semibold text-gray-500">Recent Errors</button>
                </div>
                <div className="flex items-center gap-4">
                    <RefreshCw className="cursor-pointer" onClick={fetchDevices} />
                    <LogOut className="cursor-pointer" />
                </div>
            </div>

            <table className="w-full mt-6 border text-left shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">Device ID</th>
                        <th className="p-3">Last Sync Time</th>
                        <th className="p-3">Sync Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device.deviceId} className="border-t">
                            <td className="p-3">{device.deviceId}</td>
                            <td className="p-3">{formatDateTime(device.lastSyncTime)}</td>
                            <td className="p-3">
                                {statusIcon[device.syncStatus] || ''} {device.syncStatus.charAt(0).toUpperCase() + device.syncStatus.slice(1)}
                            </td>
                            <td className="p-3">
                                <button onClick={() => handleSync(device.deviceId)} className="text-blue-600 hover:underline">
                                    [Sync Now]
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-center mt-4 text-sm text-gray-500">&lt;Pagination&gt;</div>
        </div>
    );
}


export default Dashboard