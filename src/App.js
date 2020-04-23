import React, { useState, useEffect } from "react";
import uid from 'uid';
import api from "./services/api";
import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>      
      setRepositories([...response.data])
    )
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: uid(3),
      url: "https://github.com/dhapolinario/",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    repositories.splice(repositories.findIndex(repo => repo.id === id), 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>          
        
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
