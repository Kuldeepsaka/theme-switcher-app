import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AnimatedCard from "../commonCard/commonCard";
import LazyImage from "../LazyLoad/LazyImage";

const examplesList = [
    { id: "example-1", label: "Example One" },
    { id: "example-2", label: "Example Two" },
    { id: "example-3", label: "Example Three" },
    { id: "example-4", label: "Example Four" },
];

const placeholderImages = [
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
    "https://image-processor-storage.s3.us-west-2.amazonaws.com/images/3cf61c1011912a2173ea4dfa260f1108/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg",
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
];

const Examples = () => {
    return (
        <Container>
            <div className="container py-5">
                <h2 className="mb-4 py-5 text-center">Example Cards</h2>
                <div className="row g-4">
                    {examplesList.map((example, index) => (
                        <div key={example.id} className="col-md-6 col-lg-3">
                            <AnimatedCard>
                                <Link to={`/examples/${example.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <LazyImage src={placeholderImages[index % placeholderImages.length]} alt={example.label} />
                                    <Card.Body>
                                        <Card.Title>{example.label}</Card.Title>
                                        <Card.Text>
                                            Explore {example.label.toLowerCase()} in detail.
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                            </AnimatedCard>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};
export default Examples;
