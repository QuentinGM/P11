import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

//Variables importées pour l'utilisation redux
import { useDispatch,} from "react-redux";
import { loginUser,infoUser } from "../../redux/loginSlice";

// Import des fonctions API
import { logUser, getUserProfile } from "../../core/api"; 

const SignIn = () => {
  // Initialisation de variables pour le formulaire de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenberMe, setRemenberMe] = useState(false);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Utilise useDispatch pour accéder à l'action dispatch Redux
  
 // Gestion de la soumission du formulaire de connexion
  const handlelogin = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    try {
      // Appel de la fonction d'API pour se connecter
      const userData = await logUser(email, password);
      const token = userData.body.token;
      // Dispatch de l'action Redux pour stocker le token de l'utilisateur connecté
      await dispatch(loginUser(token));
       // Stockage du token dans le localStorage si l'option "Remember Me" est activée
      if (remenberMe) {
        localStorage.setItem('token', token);
      }

      // Appel de la fonction d'API pour obtenir le profil de l'utilisateur connecté
      const userInfo = await getUserProfile(token); // Utilisation de la fonction getUserProfile
      const userInfos = {
        email: userInfo.body.email,
        firstName: userInfo.body.firstName,
        lastName: userInfo.body.lastName,
        userName: userInfo.body.userName
      };
      // Dispatch de l'action Redux pour stocker les informations de l'utilisateur connecté
      await dispatch(infoUser(userInfos));
      // Redirection vers la page utilisateur après la connexion réussie
      navigate("/user");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      // Affichage d'un message d'erreur en cas d'échec de la connexio
      setErreur("Identifiants incorrects");
    }
  };
  // Gestion du changement de l'option "Remember Me"
  const handleRememberMe = (e) => {
    setRemenberMe(e.target.checked);
    // Cette fonction permet de synchroniser l'état de la case à cocher "Remember me" avec l'état du composant React, 
    // Ce qui facilite la gestion de l'état de l'application en fonction des actions de l'utilisateur.
  };

  return (
    // Contenu du composant SignIn
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handlelogin}> {/* Soumission du formulaire à la fonction handleLogin */}
          <div className="input-wrapper">
            <label htmlFor="userEmail">User Email</label>
            <input
              type="email"
              id="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Gestionnaire d'événements pour mettre à jour l'état 'email' lorsqu'une saisie est effectuée
              placeholder=" exemple@gmail.com" // Placeholder pour guider l'utilisateur
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Gestionnaire d'événements pour mettre à jour l'état 'password' lorsqu'une saisie est effectuée
            />
          </div>
          {/* Case à cocher pour "Remember me" */}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={remenberMe} // État de la case à cocher basé sur la valeur de 'rememberMe'
              onChange={handleRememberMe} // Gestionnaire d'événements pour mettre à jour l'état 'rememberMe' lorsqu'une case à cocher est cochée ou décochée
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Button btnText={"Sign In"} className={"sign-in-button"}/> {/* Bouton de connexion */}
        </form>
        {erreur && <p className="errorConexion">{erreur}</p>} {/* Affichage du message d'erreur si une erreur est survenue */}
      </section>
    </main>
  );
};

export default SignIn;
