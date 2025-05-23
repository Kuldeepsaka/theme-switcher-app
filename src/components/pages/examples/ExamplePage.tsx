// components/pages/examples/ExamplePage.jsx
import { useParams } from 'react-router-dom';
import Example1 from './example-1';
import Example2 from './example-2';
import Example3 from './example-3';
import Example4 from './example-4';

const ExamplePage = () => {
    const { slug } = useParams();

    switch (slug) {
        case 'example-1':
            return <Example1 />;
        case 'example-2':
            return <Example2 />;
        case 'example-3':
            return <Example3 />;
        case 'example-4':
            return <Example4 />;
        default:
            return <h2>404 - Example not found</h2>;
    }
};

export default ExamplePage;
