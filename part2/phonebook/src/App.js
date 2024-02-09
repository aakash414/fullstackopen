import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification"; // Import the Notification component

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already present in the phonebook. Do you want to update the number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            showSuccessNotification(`Number updated for ${newName}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            showErrorNotification(
              `Failed to update number for ${newName}: ${error.response.data.error}`
            );
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showSuccessNotification(`Added ${newName}`);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          showErrorNotification(
            `Failed to add ${newName}: ${error.response.data.error}`
          );
        });
    }
  };

  const handleNameFilterChange = (e) => setNameFilter(e.target.value);
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  const showSuccessNotification = (message) => {
    setNotification({ message, type: "success" });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const showErrorNotification = (errorMessage) => {
    setNotification({ message: errorMessage, type: "error" });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    console.error(errorMessage);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showSuccessNotification("Person deleted");
        })
        .catch((error) => {
          showErrorNotification(
            `Failed to delete person: ${error.response.data.error}`
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
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
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
