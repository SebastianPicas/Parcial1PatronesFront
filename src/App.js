import logo from './logo.svg';
import './App.css';

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        <h1>Registro de Datos</h1>
      
        <div>
          <input
            type="text"
            placeholder="Ingrese un nuevo registro"
          />
          <button>Agregar Registro</button>
        </div>
      
        <h2>Registros Almacenados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
          
          </tbody>
        </table>
      </body>
    </div>
  );
}

export default App;
