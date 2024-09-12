import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthenticationState } from "../model/userAuthState";
import { fetchUserDetails } from "../useCases/fetchUserProfile";

// Définit l'état initial
const initialState: AuthenticationState = {
    authToken: sessionStorage.getItem('authToken') || '', // Le token est initialisé à partir de sessionStorage s'il est présent
    isAuthenticated: !!sessionStorage.getItem('authToken'), // Indique si l'utilisateur est connecté en fonction de la présence du token
    errorMessage: null, // Initialise l'erreur à null
}

// Création du slice userAuth
export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        updateToken(state, action) { // Met à jour le token dans l'état en fonction de la charge utile (payload)
            state.authToken = action.payload;
        },
        updateAuthenticationStatus(state, action) { // Met à jour le statut de connexion en fonction de la charge utile
            state.isAuthenticated = action.payload;
        }, 
        logOutUser(state) { // Réinitialise le token et le statut de connexion, et efface tout ce qui se trouve dans sessionStorage
            state.authToken = '';
            state.isAuthenticated = false;
            sessionStorage.clear();
        }, 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => { // Gère le cas où fetchUserToken réussit
            state.authToken = action.payload.authToken; // Met à jour le token
            state.isAuthenticated = true; // Met à jour le statut de connexion à true
            state.errorMessage = null; // Réinitialise l'erreur à null
        })
        builder.addCase(fetchUserDetails.rejected, (state, action: PayloadAction<any>) => { // Gère le cas où fetchUserToken échoue
            state.errorMessage = action.payload; // Met à jour l'erreur avec le message d'erreur reçu
        })
    },
})

// Export des actions générées automatiquement par createSlice
export const { updateToken, updateAuthenticationStatus, logOutUser } = authenticationSlice.actions;

// Sélecteurs pour accéder à certaines parties de l'état userAuth
export const selectAuthToken = (state: RootState) => state.authentication.authToken; // Sélecteur pour récupérer le token
export const selectIsAuthenticated = (state: RootState) => state.authentication.isAuthenticated; // Sélecteur pour vérifier si l'utilisateur est connecté
export const selectAuthError = (state: RootState) => state.authentication.errorMessage; // Sélecteur pour récupérer l'erreur d'authentification