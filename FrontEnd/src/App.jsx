import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainHome from "./components/MainHome/MainHome.jsx";
import User from "./components/User/User.jsx";
import EditName from "./components/EditName/EditName.jsx";
import SecurityRoutes from "./SecurityRoutes.jsx";
import { useSelector } from "react-redux";


const App = () => { // Détermination du chemin de base en fonction du mode (production ou développement)
  const basename = import.meta.env.MODE === "production" ? "/ArgentBank/" : "/";
  // Récupération du profil utilisateur à partir du state Redux
  const userProfil = useSelector(state =>state.login.userProfil)
  // Fonction pour effectuer la redirection si l'utilisateur est déjà connecté
  const redirectIfLoggedIn = () => {
    if (userProfil) {
      // Redirection vers la page utilisateur si l'utilisateur est connecté
      return <Navigate to="/user" />;
    }
    // Retourne null si l'utilisateur n'est pas connecté
    return null;
  };

  return (
    // Configuration du routage avec BrowserRouter
    <BrowserRouter basename={basename}>
      <Header />
      {/* Route vers la page d'accueil */}
      <Routes>
        <Route path="/" element={<MainHome />} />
         <Route
          path="/sign-in"
          element={
             // Affichage de la redirection si l'utilisateur est déjà connecté, sinon affichage de la page de connexion
            <>
              {redirectIfLoggedIn()}
              <SignIn/>
            </>
          }
        />
        {/* Route vers la page utilisateur */}
        <Route
          path="/user"
          element={
             // Affichage des routes sécurisées pour la page utilisateur
            <SecurityRoutes>
              <User />
            </SecurityRoutes>
          }
        />
        {/* Route vers la page d'édition du profil utilisateur */}
        <Route
          path="/editUser"
          element={
             // Affichage des routes sécurisées pour la page d'édition du profil utilisateur
            <SecurityRoutes>
              <EditName />
            </SecurityRoutes>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
