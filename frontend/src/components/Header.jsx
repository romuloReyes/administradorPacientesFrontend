import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { CerrarSesion } = useAuth();

  return (
    <header className="py-10 bg-emerald-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-emerald-200 text-center">
                Administrador de Pacientes de <span className="text-white">Veterinaria</span>
            </h1>

            <nav className="flex lg:gap-4 flex-col items-center gap-2 lg:flex-row mt-6 lg:mt-0">
                <Link to="/admin" className="text-white text-xl font-bold">Pacientes</Link>
                <Link to="/admin" className="text-white text-xl font-bold">Perfil</Link>
                <button
                    type="button"
                    className="text-white text-xl font-bold"
                    onClick={CerrarSesion}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </div>
    </header>
  )
}

export default Header
