// État de l'interface utilisateur pour les détails utilisateur
export type UserDetailsState = {
    details: UserDetails,
    loading: boolean,
    errorMessage: string | null,
    editing: boolean,
}

export type UserDetails = {
    firstName: string,
    lastName: string,
}