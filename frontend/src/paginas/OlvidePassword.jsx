import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === ''){
            setAlerta({msg: 'El email es obligatorio', error: true});
            return;
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', { email });
            
            console.log(data);

            setAlerta({msg: data.msg})            
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }

    }

    const {msg} = alerta;

  return (
    <>
        <div>
            <h1 className="text-emerald-600 font-black text-6xl">
                Recupera tu acceso y no Pierdas <span className="text-black">tus Pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-xl">

            {msg && <Alerta
                alerta={alerta}
            />}
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="" className="text-gray-600 block text-xl font-bold">Email</label>
                    <input 
                        type="email" 
                        className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                        placeholder="Email de Registro"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>

                <input type="submit" value="Enviar Instrucciones" className="bg-emerald-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                
                <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/registrar">
                    ¿No tienes cuenta? Registrate
                </Link>
            </nav>
        </div>
    </>
  )
}

export default OlvidePassword;
