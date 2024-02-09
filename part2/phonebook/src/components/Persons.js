// Persons.js

import React from "react";

const Persons = ({ persons, nameFilter, onDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
