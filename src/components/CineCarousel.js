import React, {useContext} from 'react'
import { CineEuropaContext } from '../context/CineEuropaContext';
import {Carousel} from 'react-bootstrap';

function CineCarousel() {
    const { cartelera, salas} = useContext(CineEuropaContext);
  return (
    <Carousel variant='dark' className="mb-5" interval={5000}>
    {cartelera.map((pelicula) => (
      <Carousel.Item key={pelicula.codigo}>
        <img
          className="d-block w-100"
          src={pelicula.imagen}
          alt={pelicula.titulo}
          style={{ height: '350px', objectFit: 'cover', borderRadius:'5px' }}
        />
        <Carousel.Caption className='text-light'>
          <h3>{pelicula.titulo}</h3>
          <p>{pelicula.descripcion}</p>
          {salas.filter(sala => sala.pelicula === pelicula.codigo).map(sala => (
            <div key={sala.id} className="mb-2">
              {sala.nombre}: {sala.horarios.join(', ')}
            </div>
          ))}
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
  )
}

export default CineCarousel
