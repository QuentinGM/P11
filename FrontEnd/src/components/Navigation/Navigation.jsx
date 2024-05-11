import logo from "../../assets/images/argentBankLogo.png";
import { LuLogOut } from "react-icons/lu";
//Variable pour manipuler le store redux
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../redux/loginSlice";

// Mon taleau gère la navigation dans une application en vérifiant si l'utilisateur est connecté en examinant 
// la présence du jeton d'authentification dans le store Redux, et en affichant des messages de débogage en conséquence.

const Navigation = () => {
  const dispatch = useDispatch();
  const loginStore = useSelector((state) => state.login);
  const token = useSelector((state) => state.login.userToken);
  if (token) {
    console.log(
      "Le token est reconnu dans le store, Sign-In -> Sign Out",
      token
    );
  } else {
    console.log("Le token n'est pas reconnu, je laisse donc Sign IN");
  }

  // Au click sur logout supression du token du local storage

  const handleRedirectHome = () => {
    localStorage.removeItem("token");
    console.log("Token supprimé du local storage");
    dispatch(logoutUser());
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <>
      <div className="login">
        {/* Conditionnellement rendu le lien "Sign In" ou "Sign Out" */}
        {loginStore && // Vérifie si loginStore est défini et non nul
          loginStore.userProfil && // Vérifie si loginStore.userProfil est défini et non nul
          loginStore.userProfil.userName && ( // Vérifie si loginStore.userProfil.userName est défini et non nul
            <Link to="/user" className="userName"> 
              <i className="fa fa-user-circle"></i> 
                <p>{loginStore.userProfil.userName}</p> 
            </Link> // L.50 : C'est un paragraphe contenant le nom d'utilisateur extrait 
            // de l'objet userProfil stocké dans loginStore. Le nom d'utilisateur est affiché à côté de l'icône d'utilisateur.
            )}
        {token ? ( // Si le token est vrai, on est donc redirigé sur la page d'accueil via le lien. Ensuite on aura le composant qui représentera la déconnexion
        // ainsi que le texte indiquant la déconnexion.
          <NavLink
          className="main-nav-item"
          to="/"
          onClick={handleRedirectHome}
          >
            <LuLogOut />
            Sign Out
          </NavLink>
        ) : ( // Sinon, donc si le token est faux voire non défini, on est redirigé sur la page de connexion, avec l'Îcone d'utilisateur et le texte indiquant la connexion.
          <NavLink className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
      </>
    </nav>
  );
};

export default Navigation;
