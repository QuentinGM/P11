import { configureStore } from "@reduxjs/toolkit";
// Le module Redux Persist est une bibliothèque qui permet de persister automatiquement l'état du store Redux dans le stockage web 
// (par exemple localStorage, AsyncStorage, etc.). 
// Il offre une solution simple pour sauvegarder et restaurer l'état de l'application même après un rechargement de la page ou une fermeture de l'application.
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage par défaut
import loginSlice from "../redux/loginSlice";

// Configuration pour la persistance du store Redux avec Redux Persist
const persistConfig = {
  key: 'root', // Clé de stockage pour Redux Persist
  storage, // Méthode de stockage (localStorage, AsyncStorage, etc.)
};

// Création du reducer persisté en utilisant Redux Persist
const persistedReducer = persistReducer(persistConfig, loginSlice.reducer);

// Configuration du store principal avec Redux Toolkit
export const mainStore = configureStore({
  reducer: {
    login: persistedReducer // Utilisation du reducer persisté pour la slice 'login'
  },
    // Configuration du middleware pour éviter les avertissements de sérialisation
    middleware: (getDefaultMiddleware) => // Le middleware dans Redux est une couche d'extension qui permet de traiter des actions de manière asynchrone 
    //avant qu'elles n'atteignent le reducer, ou après qu'elles en soient sorties. 
    // Il sert à intercepter et à modifier les actions avant qu'elles n'atteignent le reducer, 
    //ou à effectuer des actions supplémentaires telles que la gestion d'effets secondaires.
    getDefaultMiddleware({
      serializableCheck: {
         // Actions Redux Persist ignorées lors de la sérialisation
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER", "persist/FLUSH"],
      },
    }),
});

// Création d'un persistor pour gérer le stockage persistant du store
export const persistor = persistStore(mainStore);
