import { ChangeEvent, useEffect, useState } from "react"; // Importation des hooks React pour gérer les événements, l'état, et les effets
import React from "react"; // Importation de React
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux pour interagir avec le store
import { AppDispatch } from "../appLogic/store"; // Importation du type AppDispatch pour typer correctement le dispatch
import { selectErrorMessage, selectEditingStatus, selectLoadingStatus, selectUserDetails, setEditingMode } from "../appLogic/reducers/ProfilSlice"; // Importation des sélecteurs et actions liées aux détails utilisateur
import { NavLink } from "react-router-dom"; // Importation du composant NavLink pour la navigation
import { fetchUserDetails } from "../appLogic/useCases/fetchUserProfile"; // Importation du thunk pour récupérer les détails utilisateur
import { saveUserDetails } from "../appLogic/useCases/updateUserProfile"; // Importation du thunk pour mettre à jour les détails utilisateur
import { AccountItem } from "../components/Account"; // Importation du composant AccountItem pour afficher les comptes de l'utilisateur
import { selectAuthToken } from "../appLogic/reducers/AuthSlice"; // Importation du sélecteur pour récupérer le token d'authentification

// Définition du composant fonctionnel UserDashboard
export function UserDashboard() {
    const dispatch = useDispatch<AppDispatch>(); // Préparation de la fonction dispatch pour envoyer des actions
    const userDetails = useSelector(selectUserDetails); // Sélection des détails utilisateur depuis l'état global
    const isLoading = useSelector(selectLoadingStatus); // Sélection de l'état de chargement depuis l'état global
    const errorMessage = useSelector(selectErrorMessage); // Sélection des erreurs depuis l'état global
    const isEditing = useSelector(selectEditingStatus); // Sélection de l'état d'édition depuis l'état global
    const [formValues, setFormValues] = useState({ firstName: '', lastName: '' }); // État local pour stocker les valeurs du formulaire
    const authToken = useSelector(selectAuthToken); // Sélection du token d'authentification depuis l'état global

    // Effet pour récupérer les détails utilisateur lors du montage du composant
    useEffect(() => {
        dispatch(fetchUserDetails()); // Envoi de l'action pour récupérer les détails utilisateur
    }, [dispatch]);

    // Effet pour mettre à jour les valeurs du formulaire lorsque les détails sont chargés
    useEffect(() => {
        setFormValues(userDetails); // Mise à jour de l'état local avec les valeurs des détails utilisateur
    }, [userDetails]);

    // Fonction pour activer/désactiver le mode édition
    const handleEdit = () => {
        dispatch(setEditingMode(!isEditing)); // Envoi de l'action pour changer l'état d'édition
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission
        dispatch(saveUserDetails(formValues)); // Envoi de l'action pour mettre à jour les détails utilisateur avec les nouvelles valeurs
    }

    // Fonction pour gérer les changements dans les champs de formulaire
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value, // Mise à jour de l'état local avec les nouvelles valeurs des champs
        });
    };

    // Affichage d'un message d'erreur dans la console si une erreur est présente
    if (errorMessage) {
        console.log('Oups, il y a une erreur:', errorMessage);
    }

    // Affichage d'un message de chargement si les détails utilisateur sont en cours de chargement
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Redirection vers la page de connexion si aucun token n'est présent
    if (!authToken) {
        return <div>Veuillez <NavLink to='/login'>vous connecter</NavLink></div>;
    }

    // Rendu des détails utilisateur et de la liste des comptes
    return (
        <main className="main-content bg-dark">
            <div className="header-section">
                <h1>Welcome back<br />{userDetails.firstName} {userDetails.lastName}!</h1> {/* Affichage du nom complet de l'utilisateur */}
                {isEditing ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder={formValues.firstName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder={formValues.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <button type="submit">Save</button> {/* Bouton pour soumettre les modifications */}
                                <button type="button" onClick={handleEdit}>Cancel</button> {/* Bouton pour annuler l'édition */}
                            </div>
                        </form>
                    </>
                ) : (
                    <button className="edit-button" onClick={handleEdit}>Edit Name</button> /* Bouton pour activer le mode édition */
                )}
            </div>
            <h2 className="sr-only">Accounts</h2> {/* Titre caché pour l'accessibilité */}
            <AccountItem header='Argent Bank Checking (x8349)' balance='$2,082.79' details="Available Balance" />
            <AccountItem header='Argent Bank Savings (x6712)' balance='$10,928.42' details="Available Balance" />
            <AccountItem header='Argent Bank Credit Card (x8349)' balance='$184.30' details="Current Balance" />
        </main>
    );
}