// Récupère le token de connexion
export async function logUser(email, password) {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Spécification du type de contenu comme JSON
    },
    body: JSON.stringify({ email, password }), // Conversion des données en format JSON et envoi dans le corps de la requête
  });
  return response.json();
}

// Récupère le Profil Utilisateur
export async function getUserProfile(token) {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST", // Méthode HTTP POST pour envoyer le token d'authentification
    headers: {
      "Authorization": `Bearer ${token}`, // Utilisation du token d'authentification dans l'en-tête Authorization
    },
  });
  return response.json();
}

// Requette pour la modification du Username
export async function changeUsername (newUserName,token){
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT", // Méthode HTTP PUT pour effectuer la modification
    headers: {
      Authorization: `Bearer ${token}`, // Utilisation du token d'authentification dans l'en-tête Authorization
      "Content-Type": "application/json", // Spécification du type de contenu comme JSON
    },
    body: JSON.stringify({ userName: newUserName }), // Conversion des données en format JSON et envoi dans le corps de la requête
  });
  return response.json();
}