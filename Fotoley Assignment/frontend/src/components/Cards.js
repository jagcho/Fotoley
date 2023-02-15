import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export function Cards({ imgUrl }) {
    const navigate = useNavigate()

    function gotoreview() {
        navigate('/review', { state: { img: imgUrl } })
    }
    return (
        <Button onClick={gotoreview}>
            <Card className="h-100">
                <Card.Img
                    variant='top'
                    src={imgUrl}
                    height="200px"
                    style={{ objectFit: "cover" }}
                />
            </Card>
        </Button>
    )
}