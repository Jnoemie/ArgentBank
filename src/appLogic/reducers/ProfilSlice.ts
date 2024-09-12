import { PayloadAction, createSlice } from "@reduxjs/toolkit"; // Importation de PayloadAction et createSlice depuis Redux Toolkit
import { RootState } from "../store"; // Importation du type RootState qui représente l'état global de l'application
import { fetchUserDetails } from "../useCases/fetchUserProfile"; // Importation du thunk pour récupérer les détails utilisateur
import { saveUserDetails } from "../useCases/updateUserProfile"; // Importation du thunk pour mettre à jour les détails utilisateur
import { UserDetails, UserDetailsState } from "../model/userProfileState"; // Importation des types UserDetails et UserDetailsState

// Définition de l'état initial pour le slice des détails utilisateur
const initialState: UserDetailsState = {
    details: { firstName: '', lastName: '' }, // Initialisation des détails utilisateur avec des chaînes de caractères vides pour le prénom et le nom
    loading: false, // Indique si une opération est en cours
    errorMessage: null, // Stocke les erreurs éventuelles
    editing: false, // Indique si l'utilisateur est en mode édition des détails
};

// Création du slice "userDetails"
export const userDetailsSlice = createSlice({
    name: 'userDetails', // Nom du slice, utilisé pour identifier ce slice dans l'état global
    initialState, // Utilisation de l'état initial défini plus haut
    reducers: { // Les réducteurs pour gérer les modifications de l'état local
        // Réducteur pour mettre à jour l'état "editing"
        setEditingMode(state, action: PayloadAction<boolean>) {
            state.editing = action.payload; // Met à jour "editing" avec la valeur passée dans l'action
        }, 
        // Réducteur pour réinitialiser l'erreur
        resetError(state) {
            state.errorMessage = null; // Réinitialise l'erreur à null
        }
    },
    extraReducers: (builder) => { // Gestion des actions asynchrones (thunks) avec extraReducers
        // Action en cours de récupération des détails utilisateur
        builder.addCase(fetchUserDetails.pending, (state) => {
            return {
                ...state, // Garde l'état existant
                loading: true, // Définit "loading" à true pour indiquer que le chargement est en cours
            };
        });
        // Action réussie de récupération des détails utilisateur
        builder.addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
            state.details = action.payload; // Met à jour les détails utilisateur avec les données récupérées
            state.loading = false; // Définit "loading" à false car le chargement est terminé
        });
        // Action échouée de récupération des détails utilisateur
        builder.addCase(fetchUserDetails.rejected, (state, action) => {
            state.loading = false; // Définit "loading" à false car le chargement est terminé
            state.errorMessage = action.payload as string; // Stocke l'erreur dans "errorMessage"
        });
        // Action en cours de mise à jour des détails utilisateur
        builder.addCase(saveUserDetails.pending, (state) => {
            return {
                ...state, // Garde l'état existant
                loading: true, // Définit "loading" à true pour indiquer que la mise à jour est en cours
            };
        });
        // Action réussie de mise à jour des détails utilisateur
        builder.addCase(saveUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
            state.details = action.payload; // Met à jour les détails utilisateur avec les nouvelles données
            state.loading = false; // Définit "loading" à false car la mise à jour est terminée
            state.editing = false; // Définit "editing" à false pour sortir du mode édition
        });
        // Action échouée de mise à jour des détails utilisateur
        builder.addCase(saveUserDetails.rejected, (state, action) => {
            state.loading = false; // Définit "loading" à false car la mise à jour est terminée
            state.errorMessage = action.payload as string; // Stocke l'erreur dans "errorMessage"
        });
    }
});

// Exportation des actions générées automatiquement par createSlice
export const { setEditingMode, resetError } = userDetailsSlice.actions;

// Sélecteurs pour accéder à certaines parties de l'état des détails utilisateur
export const selectUserDetails = (state: RootState) => state.userDetails.details; // Sélecteur pour accéder aux détails utilisateur
export const selectLoadingStatus = (state: RootState) => state.userDetails.loading; // Sélecteur pour vérifier si le chargement est en cours
export const selectErrorMessage = (state: RootState) => state.userDetails.errorMessage; // Sélecteur pour accéder aux messages d'erreur
export const selectEditingStatus = (state: RootState) => state.userDetails.editing; // Sélecteur pour vérifier si les détails sont en mode édition