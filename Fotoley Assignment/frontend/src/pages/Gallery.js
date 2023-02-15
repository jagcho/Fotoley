import cards from "../data/Photos.json"
import { Row, Col } from "react-bootstrap"
import { Cards } from "../components/Cards"
import { Navbar } from "../components/Navbar"


export function Gallery() {
    return (

        <>
            <Navbar></Navbar>
            <div className="community" >
                <h3>Gallery</h3>
            </div>
            <Row md={2} xs={1} lg={3} className="g-3">
                {cards.map(items => (
                    <Col key={items.id}>
                        <Cards{...items} />
                    </Col>
                ))}
            </Row>

        </>
    )
}