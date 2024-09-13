import React from 'react';
import TicketCard from './TicketCard';

const GroupColumn = ({ groupKey, tickets }) => {
  return (
    <div className="group-column">
      <h2>{groupKey}</h2>
      {tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default GroupColumn;
