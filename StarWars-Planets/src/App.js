import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlanetsTable from './components/PlanetsTable';
import Provider from './context/Provider';
import './styles/table.css';

function App() {
  return (
    <Provider>
      <PlanetsTable />
    </Provider>
  );
}

export default App;
