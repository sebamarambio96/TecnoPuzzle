import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const HeroSection = () => {
    return (
        <Container fluid className="heroSection">
            <Row>
                <Col xs={7} className='d-flex flex-column justify-content-center '>
                    <h1 className="fontHero">Todo para <span className="spanHero">armar tu PC</span></h1>
                    <h2 className="fontHero2">En el <span className="spanHero">mismo lugar</span></h2>
                    <h2 className="fontHero2">Al <span className="spanHero">mejor precio</span></h2>
                </Col>
                <img src="/petConCable2.svg" alt="TecnoPet" className="pet bounce" />
                <Col xs={1}>
                </Col>
                <Col className="heroPart2" xs={4}></Col>
            </Row>
        </Container>
    )
}