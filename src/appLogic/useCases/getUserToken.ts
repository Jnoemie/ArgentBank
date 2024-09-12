import { createAsyncThunk } from "@reduxjs/toolkit"; // Importation de createAsyncThunk depuis Redux Toolkit
import { RootState } from "../store"; // Importation du type RootState, représentant l'état global de l'application
import { selectAuthToken } from "../reducers/AuthSlice"; // Importation du sélecteur pour récupérer le token d'authentification

// Création d'un thunk asynchrone pour obtenir le jeton utilisateur
export const fetchUserToken = createAsyncThunk(
    'authentication/fetchUserToken', // Nom de l'action générée par ce thunk
    async ({ email, password }: { email: string, password: string }, { getState, rejectWithValue }) => { 
        // Fonction asynchrone qui prend en paramètre les informations d'identification (email et mot de passe)
        // et des outils pour accéder à l'état global et gérer les erreurs

        const state = getState() as RootState; // Récupération de l'état global actuel
        const authToken = selectAuthToken(state); // Récupération du jeton d'authentification depuis l'état global

        // Vérification si un jeton est déjà présent
        if (!authToken) {
            // Si le jeton n'existe pas, effectuer une requête pour en obtenir un nouveau
            try {
                const response = await fetch('http://localhost:3001/api/v1/user/login', {
                    method: 'POST', // Méthode POST pour envoyer les données
                    headers: {
                        'Content-Type': 'application/json', // Indique que le corps de la requête est en JSON
                        'Accept': 'application/json', // Indique que la réponse attendue est en JSON
                    },
                    body: JSON.stringify({ email, password }), // Corps de la requête avec les informations d'identification
                });
                
                const data = await response.json(); // Conversion de la réponse en JSON

                // Vérification si la réponse est réussie (status 200-299)
                if (!response.ok) {
                    // Si la réponse n'est pas réussie, rejeter la promesse avec un message d'erreur
                    return rejectWithValue(data.message || 'Failed to login');
                }

                // Si la connexion est réussie, stocker le jeton dans le sessionStorage
                sessionStorage.setItem('authToken', data.body.token);

                // Retourner le jeton dans un objet, pour le stocker dans l'état global
                return { token: data.body.token };
            } catch (error: any) {
                // En cas d'erreur durant la requête, rejeter la promesse avec le message d'erreur
                return rejectWithValue(error.toString());
            }
        } else {
            // Si un jeton est déjà présent, le retourner directement sans faire de requête
            return { token: authToken };
        }
    }
);