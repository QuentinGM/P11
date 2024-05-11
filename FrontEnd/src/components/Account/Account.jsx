import { PropTypes } from "prop-types";
import Button from "../Button/Button";

const Account = ({title,amount,description}) => {
  return (
    <section className="account">
        <div className="account-content-wrapper">
          {/* Titre du compte */}
          <h3 className="account-title">{title}</h3>
          {/* Montant du compte */}
          <p className="account-amount">{amount}</p>
          {/* Description du compte */}
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          {/* Bouton pour voir les transactions du compte */}
          <Button className={"transaction-button"} btnText={"View transactions"}></Button>
        </div>
      </section>
  );
};
// Validation des types de données des propriétés
Account.propTypes = {
  title: PropTypes.string.isRequired, // Titre du compte (chaîne de caractères requise)
  amount: PropTypes.string.isRequired, // Montant du compte (chaîne de caractères requise)
  description: PropTypes.string.isRequired, // Description du compte (chaîne de caractères requise)
};
export default Account;