import Feature from "../Features/Feature.jsx";
import Bloc from "../Bloc/Bloc.jsx";
// Donnés pour le chaque composant feature
import featuresJson from "../../data/feature.json";
const MainHome = () => {
  const features = featuresJson.features;
  return (
    <>
      <Bloc />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {/* Mapping à travers les fonctionnalités et rendu de chaque fonctionnalité en utilisant le composant Feature */}
        {features.map((feature, index) => (
          <Feature
          key={"feature"+index} // Clé unique pour chaque fonctionnalité
          paragraph={feature.paragraph} // Paragraphe de la fonctionnalité
          image={feature.image} // Image de la fonctionnalité
          title={feature.title} // Titre de la fonctionnalité
          alt={feature.alt} // Texte alternatif de l'image de la fonctionnalité
          />
        ))}
        </section>
    </>
  );
};

export default MainHome;
