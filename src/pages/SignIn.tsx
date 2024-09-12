import { useEffect, useState } from "react"; // Importation des hooks React pour gérer l'état et les effets secondaires
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux pour interagir avec le store
import { AppDispatch } from "../appLogic/store"; // Importation du type AppDispatch pour typer correctement le dispatch
import { selectAuthToken, selectIsAuthenticated, selectAuthError } from "../appLogic/reducers/AuthSlice"// Importation des sélecteurs pour l'authentification
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate pour la navigation
import { fetchUserToken } from "../appLogic/useCases/getUserToken"; // Importation du thunk pour obtenir le token utilisateur
import { resetError } from "../appLogic/reducers/ProfilSlice"; // Importation de l'action pour effacer les erreurs d'authentification
import React from "react"; // Importation de React

// Définition du composant fonctionnel Login
export function Login() {
    // État local pour stocker les valeurs du formulaire de connexion
    const [loginValues, setLoginValues] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false); // État pour la case à cocher "Remember me"
    const authError = useSelector(selectAuthError); // Sélection de l'erreur d'authentification depuis l'état global
    const authToken = useSelector(selectAuthToken); // Sélection du token d'authentification depuis l'état global
    const navigate = useNavigate(); // Hook pour la navigation programmatique
    const dispatch = useDispatch<AppDispatch>(); // Préparation de la fonction dispatch pour envoyer des actions
    const isAuthenticated = useSelector(selectIsAuthenticated); // Sélection de l'état de connexion depuis l'état global

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        dispatch(resetError()); // Efface les erreurs précédentes avant une nouvelle tentative de connexion
        try {
            await dispatch(fetchUserToken(loginValues)).unwrap(); // Dispatch de l'action pour obtenir le token utilisateur
        } catch (err: any) {
            console.error(err); // Affichage de l'erreur en cas d'échec
        }
    };

    // Gestion du changement des valeurs du formulaire
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginValues(prevValues => ({
            ...prevValues,
            [name]: value, // Mise à jour de l'état local avec les nouvelles valeurs du formulaire
        }));
    };

    // Redirection automatique si l'utilisateur est connecté et a un token valide
    useEffect(() => {
        if (authToken && isAuthenticated) {
            navigate('/dashboard'); // Redirige vers la page de tableau de bord
        }
    }, [authToken, isAuthenticated, navigate]);

    // Gestion de la case à cocher "Remember me"
    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            localStorage.setItem('email', loginValues.email); // Stocke l'email dans le localStorage si la case est cochée
            setRememberMe(true);
        } else {
            localStorage.removeItem('email'); // Supprime l'email du localStorage si la case est décochée
            setRememberMe(false);
        }
    };

    // Chargement de l'email stocké dans le localStorage si disponible
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setLoginValues({ email: storedEmail, password: '' }); // Pré-remplit le champ email avec l'email stocké
            setRememberMe(true);
        }
    }, []);    

    // Rendu du formulaire de connexion
    return (
        <main className="main-content bg-dark">
            <section className="login-form__container">
                <i className="fa fa-user-circle login-form__icon"></i> {/* Icône utilisateur */}
                <h1>Login</h1> {/* Titre de la page */}
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name='email' value={loginValues.email} onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' value={loginValues.password} onChange={handleChange} />
                    </div>
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" onChange={handleCheckbox} checked={rememberMe} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {authError && <p style={{ color: 'red' }}>{authError}</p>} {/* Affichage de l'erreur en cas de problème d'authentification */}
                    <button className="login-form__button">Login</button> {/* Bouton de soumission */}
                </form>
            </section>
        </main>
    );
}