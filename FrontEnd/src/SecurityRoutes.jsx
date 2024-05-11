import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
// Importation du hook useSelector pour accéder au state Redux
import { useSelector } from "react-redux";

// Définition du composant SecurityRoutes
const SecurityRoutes = ({ children }) => {
   // Récupération du token d'utilisateur depuis le state Redux
  const token = useSelector((state) => state.login.userToken);
  // Vérification de l'existence du token
  // Si un token existe, les enfants du composant sont rendus
  // Sinon, l'utilisateur est redirigé vers la page de connexion
  return token ? children : <Navigate to="/sign-in" />;
};
// Validation du type de propriété children (éléments enfants) comme un nœud (node)
SecurityRoutes.propTypes = {
  children: PropTypes.node,
};
// Dans ce cas particulier, cela indique que SecurityRoutes attend une propriété children qui doit être un nœud React, 
// c'est-à-dire un élément React valide tel qu'un composant, une chaîne de caractères, un fragment, etc.
export default SecurityRoutes;
