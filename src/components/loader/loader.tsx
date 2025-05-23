import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
    </div>
);

export default Loader;
