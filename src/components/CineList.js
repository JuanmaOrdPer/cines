import React, { useContext } from 'react'
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CineEuropaContext } from '../context/CineEuropaContext';

function CineList() {
    const {salas, getPeliculaByCodigo } = useContext(CineEuropaContext);
  return (
    <ListGroup className='gap-5' style={{width : '20rem'}} >
    {salas.map((sala) => {
      const pelicula = getPeliculaByCodigo(sala.pelicula);  
      return (
        <ListGroup.Item 
          key={sala.id}
          className="d-flex justify-content-between align-items-center gap-3"
        >
          <div>
            <h5>{sala.nombre}</h5>
            <p className="mb-1">
              <strong>Película:</strong> {pelicula ? pelicula.titulo : 'No disponible'}
            </p>
            <p className="mb-0">
              <strong>Horarios:</strong> {sala.horarios.join(', ')}
            </p>
          </div>
          <Button 
            as={Link} 
            to={`/sala/${sala.id}`} 
            variant="primary"
          >
            Ver Sala
          </Button>
        </ListGroup.Item>
      );
    })}
  </ListGroup>
  )
}

export default CineList
