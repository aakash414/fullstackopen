// personService.js
import axios from "axios";

const baseUrl = "//localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

// You can also add functions for update, delete, etc. if needed

const personService = {
  getAll,
  create,
};

export default personService;
