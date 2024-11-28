import React, { useState, useEffect } from 'react';
import { TablaUsuarios } from '../../components/tablaUsuarios';

export function Principal() {
  const [users, setUsers] = useState([]); 

  // Obtener usuarios al cargar la página
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data); 
      })
      .catch(error => console.error('Error:', error)); 

  }, []);

  return (
    <div>
      <TablaUsuarios usuarios={users} />
    </div>
  );
}