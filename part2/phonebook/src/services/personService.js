// personService.js

import axios from "axios";

const baseUrl = "//localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const update = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personService = { getAll, create, update, remove };
export default personService;
