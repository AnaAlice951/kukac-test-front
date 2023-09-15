import { Link } from "react-router-dom";
import { usePaths } from "../../hooks/usePaths";

export function Header() {
  const general = "text-slate-300";
  const current = "text-white font-bold";

  const { isCurrentPage } = usePaths();

  return (
    <header className="w-full bg-black_75 flex sm:justify-between justify-center items-center px-6 py-4 sm:text-poppins_16 text-poppins_12">
      <nav className="flex sm:gap-6 gap-4 items-center">
        <Link to={"/"} className={isCurrentPage("/") ? current : general}>
          Pagina Inicial
        </Link>
        <Link
          to={"/palindromos"}
          className={isCurrentPage("/palindromos") ? current : general}
        >
          Palíndromos
        </Link>
        <Link
          to={"/caixa"}
          className={isCurrentPage("/caixa") ? current : general}
        >
          Caixa
        </Link>
        <Link
          to={"/garagem"}
          className={isCurrentPage("/garagem") ? current : general}
        >
          Garagem
        </Link>
        <Link to={"/cep"} className={isCurrentPage("/cep") ? current : general}>
          {" "}
          CEP
        </Link>
      </nav>
    </header>
  );
}

export default Header;
