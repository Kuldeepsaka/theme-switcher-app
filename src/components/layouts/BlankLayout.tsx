// src/layouts/BlankLayout.tsx
import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
    return (
        <div className="p-4">
            <Outlet />
        </div>
    );
};

export default BlankLayout;
