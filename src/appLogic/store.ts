import { combineReducers, configureStore } from "@reduxjs/toolkit"; // Importation des fonctions combineReducers et configureStore depuis Redux Toolkit
import { userDetailsSlice } from "./reducers/ProfilSlice"; // Importation du slice userDetails
import { authenticationSlice } from "./reducers/AuthSlice"; // Importation du slice authentication

// Configuration du store Redux
export const initReduxStore = configureStore({
    reducer: combineReducers({
        // combineReducers permet de combiner plusieurs réducteurs en un seul objet réducteur global
        userDetails: userDetailsSlice.reducer, // Ajout du réducteur userDetails dans l'état global sous la clé 'userDetails'
        authentication: authenticationSlice.reducer, // Ajout du réducteur authentication dans l'état global sous la clé 'authentication'
    }),
    devTools: true, // Activation des outils de développement Redux DevTools pour faciliter le débogage
});

// Définition du type RootState qui représente l'état global de l'application
export type RootState = ReturnType<typeof initReduxStore.getState>;

// Définition du type AppDispatch qui correspond au type de la fonction dispatch du store
export type AppDispatch = typeof initReduxStore.dispatch;