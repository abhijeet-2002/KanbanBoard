
export const groupBy = (tickets, groupByType) => {
    return tickets.reduce((groups, ticket) => {
      const groupKey = ticket[groupByType];
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(ticket);
      return groups;
    }, {});
  };
  
  
  export const sortTickets = (tickets, sortType) => {
    if (sortType === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sortType === 'title') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };
  