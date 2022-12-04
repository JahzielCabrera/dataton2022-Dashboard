import './App.css';
import { Routes, Route } from 'react-router-dom'

import MainInterface from './ui/MainInterface';

import RedesJefesTable from './pages/RedesJefesTable';
import RedJefeGrafo from './pages/RedesJefeGraph';
import RedesInstitucionesTable from './pages/RedesInstitucionesTable';
import RedInstitucionGrafo from './pages/RedesInstitucionesGraph';
import GrafoPrincipal from './pages/GrafoPrincipal';
import DeclaracionFuncionario from './pages/DeclaracionFuncionario';
import EstadisticasGenerales from './pages/EstadisticasGenerales';
import SistemaAnomalias from './pages/SistemaDeAnomalias';
import Home from './pages/Home';
import AnomaliasDeclaracionFuncionario from './pages/AnomaliasDeclaracion';

function App() {
  return (
    <Routes>
      <Route exact="true" path='/' element={<MainInterface element={<Home />} />}/>
      <Route exact="true" path='/estadisticas' element={<MainInterface element={<EstadisticasGenerales />} />}/>
      <Route exact="true" path='/jefes' element={<MainInterface element={<RedesJefesTable />} />}/>
      <Route exact="true" path='/jefes/:id' element={<MainInterface element={<RedJefeGrafo />} />}/>
      <Route exact="true" path='/instituciones' element={<MainInterface element={<RedesInstitucionesTable />} />}/>
      <Route exact="true" path='/instituciones/:id' element={<MainInterface element={<RedInstitucionGrafo />} />}/>
      <Route exact="true" path='/grafoprincipal' element={<MainInterface element={<GrafoPrincipal />} /> } />
      <Route exact="true" path='/grafoprincipal/:id' element={<MainInterface element={<DeclaracionFuncionario />} /> } />
      <Route exact="true" path='/anomalias' element={<MainInterface element={<SistemaAnomalias />} /> } />
      <Route exact="true" path='/anomalias/:id' element={<MainInterface element={<AnomaliasDeclaracionFuncionario />} /> } />
    </Routes>
  );
}

export default App;
