// src/layouts/MainLayout.tsx
import { Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';

const MainLayout = () => {
    return (
        <>
            <div className='d-flex flex-column h-100'>
                <main className='flex-shrink-0 overflow-hidden'>
                    <Header />
                    <Row className="m-0">
                        <Outlet />
                    </Row>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;
