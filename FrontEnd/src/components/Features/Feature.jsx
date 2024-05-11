import { PropTypes } from "prop-types";

const Feature = ({paragraph,image,title,alt}) => {
  return (
    // Div pour chaque élément de fonctionnalité
    <div className="feature-item">
      {/* Image représentant la fonctionnalité avec son texte alternatif */}
      <img src={image} alt={alt} className="feature-icon" />
      {/* Titre de la fonctionnalité */}
      <h3 className="feature-item-title">{title}</h3>
      {/* Paragraphe décrivant la fonctionnalité */}
      <p>
        {paragraph}
      </p>
    </div>
  );
};

// Validation des types de propriétés pour Feature
Feature.propTypes = {
  paragraph: PropTypes.string.isRequired, // Paragraphe de type chaîne, requis
  image: PropTypes.string.isRequired, // URL de l'image de type chaîne, requis
  title: PropTypes.string.isRequired, // Titre de type chaîne, requis
  alt: PropTypes.string.isRequired, // Texte alternatif de type chaîne, requis
};
export default Feature;
