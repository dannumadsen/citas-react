import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState ('');

    const [error, setError] = useState(false);

    useEffect( ()=> {

        if (Object.keys(paciente).length > 0){
          setNombre(paciente.nombre)
          setPropietario(paciente.propietario)
          setEmail(paciente.email)
          setFecha(paciente.fecha)
          setSintomas(paciente.sintomas)
        }

    }, [paciente])



    const handleSubmit = (e) => {
      e.preventDefault();

        //Validacion del formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')){
          console.log ('Hay al menos un campo vacio.')

          setError(true)
          return
        }
        setError(false)


      const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
      }

        //CREO UN OBJETO DE PACIENTES

        const objetoPaciente = {
          nombre,
          propietario,
          email,
          fecha,
          sintomas
        }

        // Esta funcion identifica el id del que queremos modificar y actualiza los cambios en el campo que seleccionamos 
        
        if (paciente.id){
          //Editando el registro
          objetoPaciente.id = paciente.id //le asigno el id de paciente a objeto paciente

          const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
          
          setPacientes(pacientesActualizados)

        } else {
          //Nuevo registro
          objetoPaciente.id = generarId //genero un id para el objeto paciente
          setPacientes([...pacientes, objetoPaciente]); //Generamos un nuevo arreglo de pacientes con SetPacientes para no sobreescribir el primero que hagamos
          setPaciente({})
        }
        
       //REINICIAR EL FORMULARIO

       setNombre('');
       setPropietario('');
       setEmail('');
       setFecha('');
       setSintomas('');
  }
    
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento Pacientes
        </h2>

        <p className="text-xl mt-5 text-center mb-10">
          Añade pacientes y {""}
        <span className="text-indigo-600 font-bold ">
          Administralos</span>
        </p>

        <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">

          {error && <Error>
            <p>Todos los campos son obligatorios</p>
            </Error>}

          <div className="mb-5">
            <label htmlFor= "mascota" className="block text-gray-700 uppercase font-bold">
              Nombre Mascota
            </label>

            <input 
              id="mascota"
              type="text" 
              placeholder="Nombre de la Mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value= {nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor= "propietario" className="block text-gray-700 uppercase font-bold">
              Nombre Propietario
            </label>

            <input 
              id="propietario"
              type="text" 
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value= {propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor= "email" className="block text-gray-700 uppercase font-bold">
              Email
            </label>

            <input 
              id="email"
              type="email" 
              placeholder="Email Contacto Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value= {email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor= "alta" className="block text-gray-700 uppercase font-bold">
              Alta
            </label>

            <input 
              id="alta"
              type="date" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value= {fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor= "sintomas" className="block text-gray-700 uppercase font-bold">
              Sintomas
            </label>
            <textarea
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe los sintomas"
              value= {sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>

          <input 
            type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer "
            value= { paciente.id ? "Editar paciente" : "Agregar paciente"}
          />

        </form>

    </div>
  )
}

export default Formulario
