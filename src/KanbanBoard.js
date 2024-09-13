
import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('priority'); 
  const [sorting, setSorting] = useState('priority');   
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
      })
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const groupTickets = (tickets, grouping) => {
    const groups = {};
    tickets.forEach(ticket => {
      const groupKey = ticket[grouping] || 'Unassigned';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ticket);
    });
    return groups;
  };

  const sortTickets = (groupedTickets, sorting) => {
    const sorted = {};
    Object.keys(groupedTickets).forEach(groupKey => {
      sorted[groupKey] = groupedTickets[groupKey].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority; 
        } else if (sorting === 'title') {
          return a.title.localeCompare(b.title); 
        }
        return 0;
      });
    });
    return sorted;
  };

  const groupedTickets = groupTickets(tickets, grouping);
  const sortedTickets = sortTickets(groupedTickets, sorting);

  return (
    <div className="kanban-board">
      {}
      <div className="kanban-controls">
        <div className="control-group">
          <label>Grouping: </label>
          <select onChange={handleGroupingChange} value={grouping}>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="control-group">
          <label>Sorting: </label>
          <select onChange={handleSortingChange} value={sorting}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="kanban-columns">
        {Object.keys(sortedTickets).map((groupKey) => (
          <div className="kanban-column" key={groupKey}>
            <h2>{groupKey}</h2>
            {sortedTickets[groupKey].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const TicketCard = ({ ticket }) => (
  <div className="ticket-card">
    <div className="ticket-header">
      <span className="ticket-id">{ticket.id}</span>
      <span className="ticket-priority">Priority: {ticket.priority}</span>
    </div>
    <div className="ticket-title">{ticket.title}</div>
    <div className="ticket-details">
      <p>Status: {ticket.status}</p>
      <p>User: {ticket.user}</p>
    </div>
  </div>
);

export default KanbanBoard;

