import { Link } from "react-router-dom";
import Logo from "../../images/favicon.png";
const Breadcrumb = ({ pageName, breadcrumb = true }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-10 ">
      <h2 className="text-title-md2 font-semibold text-white dark:text-white">
        {pageName}
      </h2>
      {pageName == "Sign Up" ? (
        ""
      ) : (
        <img className="w-50 h-24" src={Logo} alt="Logo" />
      )}

      {breadcrumb && (
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
