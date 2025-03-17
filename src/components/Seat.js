import React from 'react';
import { Button } from 'react-bootstrap';

const Seat = ({ seat, onClick }) => {
  let color = '';
  if (seat.occupied) {
    color = 'red';
  } else {
    color = seat.disabledSeat ? 'green' : 'blue';
  }
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: color,
        borderColor: color,
        margin: '2px',
        width: '40px',
        height: '40px'
      }}
    >
    </Button>
  );
};

export default Seat;
