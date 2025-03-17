// context/CineEuropaContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CineEuropaContext = createContext();

export const CineEuropaProvider = ({ children }) => {
  const [cartelera, setCartelera] = useState([]);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setLoading(true);
      
        const response = await fetch('/cines.json');
        
        if (!response.ok) {
          throw new Error(`Error al cargar los datos`);
        }
        
        const data = await response.json();
        
        setCartelera(data.cartelera);
        setSalas(data.salas);
      } catch (err) {
        console.error('Error cargando los datos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const toggleAsientoEstado = (idSala, asientoPos) => {
    setSalas(prevSalas => {
      return prevSalas.map(sala => {
        if (sala.id === idSala) {
          
          let nuevosAsientosOcupados = [...sala.asientosOcupados];
          
        
          if (nuevosAsientosOcupados.includes(asientoPos)) {
            nuevosAsientosOcupados = nuevosAsientosOcupados.filter(
              asiento => asiento !== asientoPos
            );
          } else {
          
            nuevosAsientosOcupados.push(asientoPos);
          }
          
          return { ...sala, asientosOcupados: nuevosAsientosOcupados };
        }
        return sala;
      });
    });
  };

 
  const getPeliculaByCodigo = (codigo) => {
    return cartelera.find(pelicula => pelicula.codigo === codigo);
  };

 
  const getSalaStats = (idSala) => {
    const sala = salas.find(s => s.id === idSala);
    if (!sala) return { total: 0, ocupados: 0, libres: 0 };
    
    const total = sala.filas * sala.columnas;
    const ocupados = sala.asientosOcupados.length;
    const libres = total - ocupados;
    
    return { total, ocupados, libres };
  };

  return (
    <CineEuropaContext.Provider value={{ 
      cartelera, 
      salas, 
      loading,
      toggleAsientoEstado,
      getPeliculaByCodigo,
      getSalaStats
    }}>
      {children}
    </CineEuropaContext.Provider>
  );
};