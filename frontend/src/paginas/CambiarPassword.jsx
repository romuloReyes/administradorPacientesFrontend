import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const { guardarPassword } = useAuth();

  const [ alerta, setAlerta ] = useState({});
  const [ password, setPassword ] = useState({
    pwd_actual:"",
    pwd_nuevo:""
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if( Object.values(password).some(campo => campo === '') ){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error: true
      })

      return
    }

    if(password.pwd_nuevo.length < 6){
      setAlerta({
        msg:'El password debe contener minimo 6 caracteres',
        error: true
      })

      return
    }

    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);
  }

  const { msg } = alerta;

  return (
    <>
        <AdminNav />
        
        <h2 className="text-center font-bold text-2xl mt-10">Cambiar Password</h2>

        <p className="text-center mt-5 mb-10 text-xl">Modifica tu {''} 
            <span className="text-emerald-600 font-bold">Password aqui</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white rounded-lg px-5 pt-5 pb-10 shadow-lg">
                { msg && <Alerta alerta={alerta} /> }

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 p-2 w-full mt-5 rounded-lg"
                            name="pwd_actual"
                            placeholder="Escribe tu password actual"
                            onChange={ e => setPassword({
                              ...password,
                              [e.target.name]: e.target.value
                            }) }
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 p-2 w-full mt-5 rounded-lg"
                            name="pwd_nuevo"
                            placeholder="Escribe tu nuevo password"
                            onChange={ e => setPassword({
                              ...password,
                              [e.target.name]: e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Actualizar Password" 
                        className="px-10 py-3 border-emerald-600 text-white bg-emerald-800 font-bold uppercase border-2 rounded-lg hover:bg-emerald-700 transition ease-in w-full mt-5"
                    
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword
