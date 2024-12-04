import React, { useState, useEffect } from 'react';
import { TablaUsuarios } from '../../components/tablaUsuarios';
import { io } from 'socket.io-client';

import Swal from 'sweetalert2';
import alertSoundFile from '../../assets/sonidoAlerta.mp3';
import warningSoundFile from '../../assets/sonidoWarning.mp3';

// const socket = io('http://localhost:3000');
const socket = io('https://backendproyectoarquitectura.onrender.com');

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const alertaAcceso = ( usuario ) => {
  // Swal.fire({
  //   title: '¡Puerta Desbloqueada!',
  //   text: `${usuario} ha desbloqueado la puerta.`,
  //   icon: 'info',
  //   confirmButtonText: 'Aceptar',
  //   position: "top-end",
  //   showConfirmButton: false,
  //   timer: 2000,
  //   backdrop: false,
  //   timerProgressBar: true,
  //   width: '25rem'
  // });
  const alertaSonido = new Audio(alertSoundFile); 
  alertaSonido.play().catch((error) => {
    console.error('Error reproduciendo el sonido:', error);
  });

  Toast.fire({
    icon: "info",
    title: "¡Puerta Desbloqueada!",
    text: `${usuario} ha desbloquado la puerta.`
  })
};

const alertaWarning = () => {
  const alertaSonido = new Audio(warningSoundFile); 
  alertaSonido.play().catch((error) => {
    console.error('Error reproduciendo el sonido:', error);
  });

  Swal.fire({
    title: '¡Advertencia!',
    html: '<p>Usuario no admitido.</p><p>Se intento desbloquear la puerta con una tarjeta no válida.</p>',
    icon: 'warning',
    iconColor: 'red',
    confirmButtonText: 'Ok',
    backdrop: false,
    timerProgressBar: true
  });
};

export function Principal() {
  const [users, setUsers] = useState([]); 

  // Usuarios al cargar la pagina y conectar el websocket.
  useEffect(() => {
    fetch('https://backendproyectoarquitectura.onrender.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data); 
      })
      .catch(error => console.error('Error:', error)); 

      socket.on('card-escaneada', (data) => {
        const { codigo_card, user } = data;
        const mensaje = user 
          ? `Tarjeta escaneada: ${codigo_card}. Usuario: ${user}`
          : `Tarjeta no registrada: ${codigo_card}`;
        console.log(mensaje)
        if(user){
          alertaAcceso( user );
        }else{
          alertaWarning();
        }

      });

      return () => {
        socket.off('card-escaneada');
      }

  }, []);
 
  return (
    <div>
      <TablaUsuarios usuarios={users} />
    </div>
  );
}