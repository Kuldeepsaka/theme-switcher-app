// src/components/footer/Footer.tsx
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Footer = () => {
    const theme = useSelector((state: RootState) => state.theme.mode);

    return (
        <footer className={`footer mt-auto py-3 bg-${theme} text-${theme === 'light' ? 'dark' : 'light'}`}>
            <Container className="text-center">
                <p className="mb-0">© {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
