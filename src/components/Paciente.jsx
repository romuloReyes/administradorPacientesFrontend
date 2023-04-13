import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {
    const { setEdicion, eliminarPaciente } = usePacientes();

    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

    const formatearFecha = (fecha)=>{
      const nuevaFecha = new Date(fecha);
      return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha); //Intl es una api de JS
    }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl text-black">
        <p className="font-bold uppercase my-2">Nombre:{' '} 
          <span className="font-normal normal-case text-black text-xl">{nombre}</span>
        </p>

        <p className="font-bold uppercase my-2">propietario:{' '} 
          <span className="font-normal normal-case text-black text-xl">{propietario}</span>
        </p>

        <p className="font-bold uppercase my-2">Email Contacto:{' '} 
          <span className="font-normal normal-case text-black text-xl">{email}</span>
        </p>

        <p className="font-bold uppercase my-2">Fecha de alta:{' '} 
          <span className="font-normal normal-case text-black text-xl">{formatearFecha(fecha)}</span>
        </p>

        <p className="font-bold uppercase my-2">Síntomas:{' '} 
        <span className="font-normal normal-case text-black text-xl">{sintomas}</span>
        </p>

        <div className="flex justify-end gap-14 mr-4">
          <button 
            type="button"
            className="mt-5 px-10 py-2 border-emerald-600 text-white bg-emerald-800 font-bold uppercase border-2 rounded-lg hover:bg-emerald-700 transition ease-in"
            onClick={()=> setEdicion(paciente)}
          >
            editar
          </button>

          <button 
            type="button"
            className="mt-5 px-10 py-2 border-red-600 text-white bg-red-900 font-bold uppercase border-2 rounded-lg hover:bg-red-700 transition ease-in"
            onClick={ ()=> eliminarPaciente(_id) }
          >
            eliminar
          </button>
        </div>
    </div>
  )
}

export default Paciente
