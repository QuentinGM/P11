import { useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

// Variables pour accéder au store Redux et dispatcher des actions
import { useSelector, useDispatch } from "react-redux";
import { infoUserName } from "../../redux/loginSlice";
// Import de la fonction pour effectuer la requête PUT pour changer le nom d'utilisateur dans la base de données
import { changeUsername } from "../../core/api";

const EditName = () => {
  const navigate = useNavigate();
  // Récupération de la slice 'login' depuis le store Redux
  const loginStore = useSelector((state) => state.login);
  const storeUserProfil = loginStore.userProfil; // Informations du profil utilisateur dans le store
  const dispatch = useDispatch(); // Dispatcher Redux pour envoyer des actions
  // Initialisation de l'état local avec le nom d'utilisateur actuel du store
  const [newUserName, setNewUserName] = useState(storeUserProfil.userName);
  const token = loginStore.userToken;
  // Gestion du changement de nom d'utilisateur lors de la saisie dans l'input
  const handleChangeUserName = (e) => {
    setNewUserName(e.target.value);
  };
  // Fonction pour annuler et revenir à la page utilisateur
  const handleCancel = () => {
    navigate("/user");
  };
  // Fonction pour soumettre le formulaire de modification du nom d'utilisateur
  const handleForm = async (e) => {
    e.preventDefault();
  // Appel de la fonction pour effectuer la requête PUT pour changer le nom d'utilisateur dans la base de données
    const updateUserName = await changeUsername(newUserName, token)
    // Vérification de la réponse de la requête PUT
    if (updateUserName.status === 200) {
      // Mise à jour du nom d'utilisateur dans le store Redux
      dispatch(infoUserName(newUserName));
      console.log("Le nom d'utilisateur a bien été modifié.", updateUserName.status);
    } else {
      console.error("La mise à jour du nom d'utilisateur a échoué.");
    }
  };
  return (
    <main className="main bg-dark">
    <section className="sign-in-content toogle-edit-name">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Edit User info</h1>
      <form onSubmit={handleForm} onClick={(event) => event.stopPropagation()}>
        {/* Champ pour modifier le nom d'utilisateur */}
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            value={newUserName}
            onChange={handleChangeUserName}
            type="text"
            id="username"
            placeholder="Tapez votre username"
          />
        </div>
         {/* Champs pour afficher le prénom et le nom de l'utilisateur (non modifiables) */}
        <div className="input-wrapper">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            disabled // Fonction React
            value={storeUserProfil.firstName}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            disabled // Fonction React
            value={storeUserProfil.lastName}
          />
        </div>
        {/* Bouton pour sauvegarder les modifications */}
        <Button  btnText={"Save"} className={"sign-in-button"}/>
      </form>
         {/* Bouton pour annuler les modifications et revenir à la page utilisateur */}
        <Button  btnText={"Cancel"} onClick={handleCancel} className={"sign-in-button"}/>
    </section>
    </main>
  );
};

export default EditName;
