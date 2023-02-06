import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const {token} = params;

    useEffect( () => { 
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg:'Coloca tu nuevo password'
                });

                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg:'Hubo un error con el enlace',
                    error: true
                })
            }
        }
        comprobarToken();
    }, [] );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password.length < 6){
            setAlerta({
                msg:'El password debe ser minimo de 6 caracteres',
                error: true
            })
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, {password});

            setAlerta({
                msg: data.msg
            })

            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta;

  return (
    <>
        <div>
            <h1 className="text-emerald-600 font-black text-6xl">
                Restablece tu Password y no Pierdas Acceso a <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 bg-white rounded-xl">
            {msg && <Alerta
                alerta={alerta}
            />}

            {tokenValido && (
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label 
                            className="text-gray-600 block text-xl font-bold"
                        >
                            Nuevo Password
                        </label>

                        <input 
                            type="password" 
                            className="border w-full mt-3 p-3 bg-gray-50 rounded-xl" 
                            placeholder="Tu Nuevo password"
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Restablecer Password" 
                        className="bg-emerald-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto" 
                    />
                </form>
                
            )}
            {passwordModificado && 
                <Link className="block text-gray-500 text-center my-5 hover:text-black" to="/">
                        Iniciar Sesión
                </Link>
            }
        </div>
    </>
  )
}

export default NuevoPassword
