// pages/Home.js
import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import CineCarousel from '../components/CineCarousel';
import CineList from '../components/CineList';

const Home = () => {


  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Cartelera</h1>
      <CineCarousel></CineCarousel>     
      <h2 className="text-center mb-4">Nuestras Salas</h2>
      <Row className="justify-content-center">
        <Col md={8}>
        <CineList></CineList>  
        </Col>
      </Row>
    </Container>
  );
};

export default Home;