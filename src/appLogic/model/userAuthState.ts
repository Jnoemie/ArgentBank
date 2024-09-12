// Format pour la gestion de l'authentification d'un utilisateur
export type AuthenticationState = {
    authToken: string,
    isAuthenticated: boolean,
    errorMessage: string | null,
}