import argentBankLogo from '../assets/argentBankLogo.png'; // Importation du logo d'Argent Bank depuis les assets
import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks Redux pour interagir avec le store

import { selectUserDetails } from "../appLogic/reducers/ProfilSlice"; // Importation du sélecteur pour récupérer les détails utilisateur
import { logOutUser, selectIsAuthenticated } from '../appLogic/reducers/AuthSlice'; // Importation de l'action pour déconnecter l'utilisateur et du sélecteur pour vérifier s'il est connecté
import { AppDispatch } from "../appLogic/store"; // Importation du type AppDispatch pour typer correctement le dispatch
import { Link, NavLink } from 'react-router-dom'; // Importation des composants de navigation de React Router

// Définition du composant fonctionnel HeaderBar
export function HeaderBar() {
    // Récupération des détails utilisateur depuis l'état global
    const userDetails = useSelector(selectUserDetails);
    // Vérification si l'utilisateur est connecté
    const isAuthenticated = useSelector(selectIsAuthenticated);
    // Préparation de la fonction dispatch typée pour envoyer des actions au store Redux
    const dispatch = useDispatch<AppDispatch>();

    return (
        <nav className="header-bar">
            {/* Lien vers la page d'accueil avec le logo d'Argent Bank */}
            <Link className="header-bar__logo" to="/">
                <img
                    className="header-bar__logo__image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo" // Texte alternatif pour l'image du logo
                />
                <h1 className="sr-only">Argent Bank</h1> {/* Titre caché pour l'accessibilité */}
            </Link>
            <div>
                {/* Si l'utilisateur est connecté, afficher le lien vers le profil et le bouton de déconnexion */}
                {isAuthenticated ? (
                    <>
                        <NavLink className="header-bar__link" to="./profile">
                            <i className="fa fa-user-circle"></i> {/* Icône utilisateur */}
                            {userDetails.firstName} {/* Affichage du prénom de l'utilisateur */}
                        </NavLink>
                        <NavLink className="header-bar__link" to="/" onClick={() => dispatch(logOutUser())}>
                            <i className="fa fa-sign-out"></i> {/* Icône de déconnexion */}
                            Sign Out
                        </NavLink>
                    </>
                ) : (
                    // Si l'utilisateur n'est pas connecté, afficher le lien vers la page de connexion
                    <NavLink className="header-bar__link" to="./sign-in">
                        <i className="fa fa-user-circle"></i> {/* Icône utilisateur */}
                        Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
}