import PropTypes from "prop-types"

const Button = ({btnText,onClick,className}) => {
  return (
    // Bouton avec texte, gestionnaire de clic et classe CSS
    <button className={className} onClick={onClick}>{btnText}</button>
  );
};

// Validation des types de données des propriétés
Button.propTypes ={
  btnText: PropTypes.string.isRequired, // Texte du bouton (chaîne de caractères requise)
  onClick:PropTypes.func, // Gestionnaire de clic (fonction)
  className:PropTypes.string // Classe CSS du bouton (chaîne de caractères)
}

export default Button;