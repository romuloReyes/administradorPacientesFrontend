import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const { msg } = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if([ email, password ].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

  return (
    <>  
        <div>
            <h1 className="text-emerald-600 font-black text-6xl">
                Inicia Sesion y Administra tus <span className="text-black">Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-xl">
            { msg && <Alerta
                alerta={alerta}
            /> }

            <form onSubmit={ handleSubmit }>
                <div className="my-5">
                    <label 
                        htmlFor="" 
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                        placeholder="Email de Registro"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    /> 
                </div>

                <div className="my-5">
                    <label 
                        htmlFor="" 
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                        placeholder="Tu Password"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                </div>

                <input 
                    type="submit" 
                    value="Iniciar Sesion" 
                    className="bg-emerald-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto" 
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/registrar">
                    ¿No tienes cuenta? Registrate
                </Link>

                <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/olvide-password">
                    Olvide mi Password
                </Link>
            </nav>
        </div>
    
    </>
  )
}

export default Login;
