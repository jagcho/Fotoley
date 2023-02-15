import cards from "../data/Photos.json"
import { Row, Col, Button } from "react-bootstrap"
import { Cards } from "../components/Cards"
import { Navbar } from "../components/Navbar"



export function Community() {


    return (

        <>
            <Navbar></Navbar>
            <div className="community" >
                <h3 >   Community  </h3>
            </div>
            <Row md={3} xs={2} lg={4} className="g-3">

                {cards.map(items => (
                    <Col key={items.id}>
                        <Cards{...items} />
                    </Col>
                ))}

            </Row>

        </>
    )
}