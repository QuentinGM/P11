import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Accounts from "../../data/account"; // tableau Json
import Account from "../Account/Account"; //Composant
import Button from "../Button/Button";
const User = () => {
   // Récupération du nom d'utilisateur à partir de l'état du store Redux
  const username = useSelector(state =>(state.login.userProfil.userName))
  // Hook de navigation pour la redirection vers la modification du nom d'utilisateur
  const navigate = useNavigate();
   // Gestion de l'affichage du formulaire pour modifier le nom d'utilisateur
  const handleDisplayEdit = (e) => {
    e.preventDefault() // Empêche le comportement par défaut du bouton
    navigate("/editUser"); // Redirection vers la modification du nom d'utilisateur
  };
  return (
    <main className="main bg-dark2">
      <div className="header">
        {/* Affichage du nom d'utilisateur */}
        <h1>
          Welcome back
          <br />
          {username}!
        </h1>
        {/* Bouton pour afficher le formulaire de modification du nom d'utilisateur */}
        <Button className={"edit-button"} btnText={"Edit Name"} onClick={handleDisplayEdit}></Button>
      </div>
       {/* Titre pour les comptes */}
      <h2 className="sr-only">Accounts</h2>
        {/* Affichage des comptes à partir du tableau JSON */}
      {Accounts.map((account, index) => (
          <Account
          key={"account"+index}
          title={account.title}
          amount={account.amount}
          description={account.description}         
          />
        ))}
    </main>
  );
};

export default User;
