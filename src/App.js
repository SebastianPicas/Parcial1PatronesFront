import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [registro, setRegistro] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [notificacion, setNotificacion] = useState(''); 
  
  const handleInputChange = (event) => {
    setRegistro(event.target.value);
  };

  const agregarRegistro = async () => {
    if (registro.trim() === '') return;

    try {
      const response = await fetch('http://24.144.66.63:8080/api/nuevo_mensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: registro }),
        mode: 'cors',
      });
      

      if (response.ok) {
        setRegistro('');
        setNotificacion('Registro agregado exitosamente.'); 
        obtenerMensajes(); 
      } else {
        setNotificacion('Error al agregar el registro.'); 
      }
    } catch (error) {
      setNotificacion('Error al conectar con la API.'); 
    }


    setTimeout(() => {
      setNotificacion('');
    }, 3000);
  };

  const obtenerMensajes = async () => {
    try {
      const response = await fetch('http://24.144.66.63:8080/api/mensajes');

      if (response.ok) {
        const data = await response.json();
        setMensajes(data);
      } else {
        console.error('Error al obtener los mensajes');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  useEffect(() => {
    obtenerMensajes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <h1>Registro de Datos</h1>
        
        {}
        {notificacion && <div className="notification">{notificacion}</div>}

        <div>
          <input
            type="text"
            placeholder="Ingrese un nuevo registro"
            value={registro}
            onChange={handleInputChange}
          />
          <button onClick={agregarRegistro}>Agregar Registro</button>
        </div>
      
        <h2>Registros Almacenados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registro</th>
            </tr>
          </thead>
            {mensajes.map((mensaje, index) => (
              <tr key={index}>
                <td>{mensaje.id}</td>
                <td>{mensaje.texto}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default App;
