import { createAsyncThunk } from "@reduxjs/toolkit"; // Importation de createAsyncThunk depuis Redux Toolkit
import { RootState } from "../store"; // Importation du type RootState, représentant l'état global de l'application
import { UserDetails } from "../model/userProfileState"; // Importation du type UserDetails, qui décrit la structure des données des détails utilisateur

// Création d'un thunk asynchrone pour mettre à jour les détails utilisateur
export const saveUserDetails = createAsyncThunk(
    'userDetails/saveUserDetails', // Nom de l'action générée par ce thunk
    async (formValues: UserDetails, { getState, rejectWithValue }) => { 
        // Fonction asynchrone prenant en entrée les valeurs du formulaire (formValues)
        // et des outils pour accéder à l'état global et gérer les erreurs

        const state = getState() as RootState; // Récupération de l'état global actuel
        const authToken = state.authentication.authToken; // Récupération du jeton d'authentification depuis l'état global

        // Vérification si un jeton est présent
        if (!authToken) {
            return rejectWithValue('Token not found'); // Rejet de l'action avec un message d'erreur si le jeton est absent
        }

        try {
            // Envoi de la requête pour mettre à jour les détails utilisateur
            const response = await fetch('http://localhost:3001/api/v1/user/details', {
                method: 'PUT', // Méthode PUT pour la requête, utilisée pour mettre à jour des données existantes
                headers: {
                    'Content-Type': 'application/json', // Indique que le corps de la requête est en JSON
                    'Accept': 'application/json', // Indique que la réponse attendue est en JSON
                    'Authorization': `Bearer ${authToken}`, // Ajout du jeton dans les en-têtes pour l'authentification
                },
                body: JSON.stringify(formValues), // Corps de la requête avec les nouvelles données des détails utilisateur
            });

            const data = await response.json(); // Conversion de la réponse en JSON
            return data.body; // Renvoi des nouvelles données des détails (contenu dans `body`) en cas de succès
        } catch (error: any) {
            return rejectWithValue(error.toString()); // Rejet de l'action avec l'erreur en cas d'échec
        }
    }
);