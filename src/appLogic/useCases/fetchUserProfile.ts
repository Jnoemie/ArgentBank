import { createAsyncThunk } from "@reduxjs/toolkit"; // Importation de la fonction createAsyncThunk depuis Redux Toolkit
import { RootState } from "../store"; // Importation du type RootState qui représente l'état global de l'application
import { selectAuthToken } from "../reducers/AuthSlice"; // Importation du sélecteur pour récupérer le token d'authentification

// Création d'un thunk asynchrone pour récupérer les détails utilisateur
export const fetchUserDetails = createAsyncThunk(
    'userDetails/fetchUserDetails', // Nom de l'action générée par le thunk
    async (_, { getState, rejectWithValue }) => { // Fonction asynchrone qui contient la logique pour récupérer les détails
        const state = getState() as RootState; // Récupération de l'état global actuel
        const authToken = selectAuthToken(state); // Récupération du token d'authentification depuis l'état global

        // Vérification si le token est présent
        if (!authToken) {
            return rejectWithValue('Token not found'); // Rejet de l'action avec un message d'erreur si le token est absent
        }

        try {
            // Envoi de la requête pour récupérer les détails utilisateur
            const response = await fetch('http://localhost:3001/api/v1/user/details', {
                method: 'POST', // Méthode POST pour la requête
                headers: {
                    'Content-Type': 'application/json', // Indique que le corps de la requête est en JSON
                    'Accept': 'application/json', // Indique que la réponse attendue est en JSON
                    'Authorization': `Bearer ${authToken}`, // Ajout du token dans les en-têtes pour l'authentification
                },
            });

            const data = await response.json(); // Conversion de la réponse en JSON
            return data.body; // Renvoi des données utilisateur (contenu dans `body`) en cas de succès
        } catch (error: any) {
            return rejectWithValue(error.toString()); // Rejet de l'action avec l'erreur en cas d'échec
        }
    }
);