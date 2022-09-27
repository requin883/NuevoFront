import {  useNavigate } from "react-router-dom";
import { Col, Button } from "reactstrap"




export default function Card({ title, cat, children }) {

    const navigate = useNavigate();

    const route = "../../../../Public/static/img";
    const imgSrc = title=="USDT"?`${route}/tether.png`:title=="BTC"?`${route}/btc.png`:title=="SOL"?`${route}/Solana.png`:title=="DOGE"?`./doge.png`:title=="ADA"?`/cardano.png`:`/binance.png`;
    return (
        <>
            <Col md="3" key={title} className="card me-3 mb-3">
                <div className="d-flex flex-column alert newcard">
                    <h4 className="align-self-center">{title} {title=="DOGE"?<img className="ps-2 cryptodog" src={imgSrc}></img>:<img className="ps-2 cryptoimg" src={imgSrc}></img>}</h4>
                    <p className="category text-info">{cat}</p>
                    <p>
                        {children}
                    </p>
                    <Button
                        className="btn-icon btn-round"
                        color="info"
                        onClick={()=>navigate("/login")}
                    >
                        Buy {title}!
                    </Button>
                </div>
            </Col>
        </>
    )
}