import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        
        if([nombre, email, password, confirmarPassword].includes('')){
            setAlerta({ msg:'Todos los campos son obligatorios', error:true });
            return;
        }
        if(password !== confirmarPassword){ 
            setAlerta({ msg:'Los password no son iguales', error:true });
            return;
        }
        if(password.length < 6){
            setAlerta({ msg:'El password debe ser de almenos 6 caracteres', error:true });
            return;
        }

        setAlerta({});

        //Crear el usuario en la api
        try {
            const url = "http://localhost:4000/api/veterinarios"
            await axios.post(url, {nombre, email, password});
            setAlerta({
                msg:'Creado correctamente, revisa tu email',
                error:false
            })

        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        } 
    }

    const {msg} = alerta;

    return (
      <>
        <div>
            <h1 className="text-emerald-600 font-black text-6xl">
                Crea tu cuenta y administra <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-xl">

            {msg && <Alerta
                alerta={alerta}
            />}
            <form
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label 
                        className="text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>

                    <input 
                        type="text" 
                        className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>

                    <input 
                        type="email" 
                        className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                        placeholder="Email de Registro"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>

                    <input 
                        type="password" 
                        className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                        placeholder="Tu password"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="text-gray-600 block text-xl font-bold"
                    >
                        Confirmar Password
                    </label>

                    <input 
                        type="password" 
                        className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                        placeholder="Confirma tu password"
                        value={confirmarPassword}
                        onChange={ e => setConfirmarPassword(e.target.value) }
                    />
                </div>

                <input type="submit" value="Registrar" className="bg-emerald-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                
                <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/olvide-password">
                    Olvide mi Password
                </Link>
            </nav>
        </div>
        
      </>
    )
  }
  
  export default Registrar;