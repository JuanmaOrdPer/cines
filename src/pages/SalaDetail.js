// pages/SalaDetail.js
import React, { useContext, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { CineEuropaContext } from "../context/CineEuropaContext";

const SalaDetail = () => {
  const { idsala } = useParams();
  const salaId = parseInt(idsala, 10);

  const { salas, getPeliculaByCodigo, toggleAsientoEstado, getSalaStats } =
    useContext(CineEuropaContext);

  const sala = salas.find((s) => s.id === salaId);

  const isAsientoOcupado = useMemo(() => {
    if (!sala) return () => false;

    return (fila, columna) => {
      const posicion = `${fila}-${columna}`;
      return sala.asientosOcupados.includes(posicion);
    };
  }, [sala]);

  const isAsientoMinusvalido = useMemo(() => {
    if (!sala) return () => false;

    return (fila, columna) => {
      const posicion = `${fila}-${columna}`;
      return sala.asientosMinusvalidos.includes(posicion);
    };
  }, [sala]);

  const handleAsientoClick = useMemo(() => {
    if (!sala) return () => {};

    return (fila, columna) => {
      const posicion = `${fila}-${columna}`;
      toggleAsientoEstado(salaId, posicion);
    };
  }, [sala, salaId, toggleAsientoEstado]);

  const renderAsientos = useMemo(() => {
    if (!sala) return [];

    const filas = [];

    for (let fila = 1; fila <= sala.filas; fila++) {
      const asientosEnFila = [];

      for (let columna = 1; columna <= sala.columnas; columna++) {
        const ocupado = isAsientoOcupado(fila, columna);
        const minusvalido = isAsientoMinusvalido(fila, columna);

        let backgroundColor;
        if (ocupado) {
          backgroundColor = "red";
        } else if (minusvalido) {
          backgroundColor = "green";
        } else {
          backgroundColor = "blue";
        }

        asientosEnFila.push(
          <div
            key={`${fila}-${columna}`}
            className="m-1"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => handleAsientoClick(fila, columna)}>
            {`${fila}-${columna}`}
          </div>
        );
      }

      filas.push(
        <div
          key={`fila-${fila}`}
          className="d-flex justify-content-center mb-2">
          {asientosEnFila}
        </div>
      );
    }

    return filas;
  }, [sala, isAsientoOcupado, isAsientoMinusvalido, handleAsientoClick]);

  if (!sala) {
    return <Navigate to="/" />;
  }

  const pelicula = getPeliculaByCodigo(sala.pelicula);

  return (
    <Container className="py-4">
      <Card className="m-4 bg-light border-0 shadow" style={{ width: "18rem" }}>
        <Card.Header className="d-flex flex-column align-items-center justify-content-center h-90">
          <Card.Title>{sala.nombre}</Card.Title>
          <Card.Text>
            {pelicula.titulo}
          </Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-center mb-3">
            Distribución de Asientos
          </Card.Title>
          <Container className="d-flex flex-column align-items-center">
            {renderAsientos}
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SalaDetail;
