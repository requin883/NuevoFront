import { Col, Button } from "reactstrap"

export default function Card({ title, cat, children }) {
    return (
        <>
            <Col md="4" key={title} className="card">
                <div className="d-flex flex-column alert newcard">
                    <h4 className="align-self-center">{title}</h4>
                    <p className="category text-info">{cat}</p>
                    <p>
                    {children}
                    </p>
                    <Button
                        className="btn-icon btn-round"
                        color="info"
                        onClick={(e) => e.preventDefault()}
                    >
                        Buy {title}!
                    </Button>
                </div>
            </Col>
        </>
    )
}