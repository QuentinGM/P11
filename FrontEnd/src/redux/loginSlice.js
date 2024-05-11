// Creation de la slice de conexion

import { createSlice } from "@reduxjs/toolkit";
// Pour l'importation de redux il y'a eu le npm install @reduxjs/toolkit ce qui a permis au bon fonctionnement du code présenté ci-dessous

export const loginSlice = createSlice({ // La fonction createSlice est utilisée pour créer une tranche Redux nommée "login". 
  // Cette tranche contient deux états initiaux : userToken et userProfil, qui sont tous deux initialement définis sur null.
  name: "login",
  initialState: {
    userToken: null,
    userProfil: null,
  },
  reducers: { // Le reducer est utilisé pour spécifier comment l'état de l'application change en réponse aux actions envoyées au store Redux.
    // Un reducer qui met à jour l'état userToken avec le token de l'utilisateur lorsqu'il se connecte.
    loginUser: (state, action) => {
      state.userToken = action.payload; // Stockera les informations avec dispatch
    },
    // Un reducer qui réinitialise les informations de connexion utilisateur lorsque l'utilisateur se déconnecte.
    logoutUser: (state) => {
      state.userToken = null; // Réinistialise les informations Users.
      state.userProfil= null;
    },
    // Un reducer qui met à jour l'état userProfil avec les informations du profil utilisateur lorsqu'elles sont récupérées.
    infoUser: (state, action) => {
      state.userProfil = action.payload; // Stockera les informations avec dispatch
    },
    // Un reducer qui met à jour le nom d'utilisateur dans l'état userProfil lorsque celui-ci est modifié.
    infoUserName: (state, action) => {
      console.log("voici le payload info user Name :", action.payload);
      state.userProfil.userName = action.payload; // Stockera les informations avec dispatch
    },
  },
});

// Les actions créées à partir de la slice sont exportées pour être utilisées ailleurs dans l'application.
export const { loginUser, logoutUser, infoUser, infoUserName } =
  loginSlice.actions;

export default loginSlice;
