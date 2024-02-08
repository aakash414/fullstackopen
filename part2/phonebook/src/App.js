import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName))
      return alert(`${newName} is already present in the phonebook.`);

    axios
      .get("//localhost:3001/persons", { name: newName, number: newNumber })
      .then((res) => setPersons(persons.concat(res.data)));
    setNewName("");
    setNewNumber("");
  };

  const handleNameFilterChange = (e) => setNameFilter(e.target.value);
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  useEffect(() => {
    axios.get("//localhost:3001/persons").then((res) => setPersons(res.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h2>Add New</h2>
      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        onChangeName={handleNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
