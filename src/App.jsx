import { useState, useEffect } from "react";
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes";

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerLocalStorage = () =>{
      const pacientesLS = JSON.parse(localStorage.getItem ('pacientes')) ?? []; // los ?? significan que, si no hay nada en localstorage que agregue un arreglo vacio

      setPacientes(pacientesLS)
    }
    obtenerLocalStorage();
  }, []) //Cuando queda el arreglo vacio significa que se ejecuta una sola vez

  useEffect (() =>{
    //sincronizo la app con localstorage
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
   <div className = "container mx-auto mt-20">
      <Header/>

      <div className="mt-12 md:flex">
        <Formulario
          pacientes = {pacientes}
          setPacientes = {setPacientes}
          paciente = {paciente}
          setPaciente = {setPaciente}
        />
        <ListadoPacientes
        pacientes = {pacientes}
        setPaciente = {setPaciente}
        eliminarPaciente = {eliminarPaciente}
        />
      </div>
   </div>
  )
}

export default App;
