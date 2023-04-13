import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth();
    const [ perfil, setPerfil ] = useState({});
    const [ alerta, setAlerta ] = useState({});
    
    useEffect( ()=>{
        setPerfil(auth)
    
    }, [auth] );
    console.log(perfil);

    const handleSubmit = async e => {
        e.preventDefault();

        const { nombre, email } = perfil;
        if([ nombre, email ].includes('')){
            setAlerta({
                msg:'El email y nombre son obligatorios',
                error: true
            })
            return 
        }

        const resultado = await actualizarPerfil(perfil);

        setAlerta(resultado);
    }

    const { msg } = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="text-center font-bold text-2xl mt-10">Editar Perfil</h2>

        <p className="text-center mt-5 mb-10 text-xl">Modifica tu {''} 
            <span className="text-emerald-600 font-bold">Informacion aqui</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white rounded-lg px-5 pt-5 pb-10 shadow-lg">
                { msg && <Alerta alerta={alerta} /> }

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nombre</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 p-2 w-full mt-5 rounded-lg"
                            name="nombre"
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value

                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 p-2 w-full mt-5 rounded-lg"
                            name="web"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value

                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Telefono</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 p-2 w-full mt-5 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value

                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Email</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 p-2 w-full mt-5 rounded-lg"
                            name="email"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value

                            })}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Guardar Cambios" 
                        className="px-10 py-3 border-emerald-600 text-white bg-emerald-800 font-bold uppercase border-2 rounded-lg hover:bg-emerald-700 transition ease-in w-full mt-5"
                    
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil
