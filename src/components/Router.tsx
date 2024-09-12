import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"; 
// Importation des éléments nécessaires pour la gestion des routes avec React Router
import { HomePage } from "../pages/HomePage"; // Importation de la page d'accueil
import { HeaderBar } from "./Navbar"; // Importation du composant Navbar
import { Login } from "../pages/SignIn"; // Importation de la page de connexion
import { AppFooter } from "./Footer"; // Importation du composant Footer
import { UserDashboard } from "../pages/User"; // Importation de la page de profil utilisateur

// Définition du composant Layout qui encapsule Navbar, Footer et le contenu principal
const Layout = () => {
    return (
        <>
            <HeaderBar /> {/* Affichage de la barre de navigation */}
            <Outlet /> {/* Point de sortie pour rendre les composants enfants en fonction de la route */}
            <AppFooter /> {/* Affichage du pied de page */}
        </>
    );
}

// Configuration du routeur avec createBrowserRouter
const router = createBrowserRouter([
    {
        path: '/', // Route racine de l'application
        element: (
            <Layout /> // Utilisation du layout défini plus haut pour cette route
        ),
        errorElement: <p>Oups, ça marche pas</p>, // Élément à afficher en cas d'erreur de routage
        children: [ // Définition des routes enfants
            {
                path: '', // Route pour la page d'accueil (équivalente à '/')
                element: <HomePage /> // Composant rendu pour cette route
            }, 
            {
                path: 'sign-in', // Route pour la page de connexion ('/sign-in')
                element: <Login /> // Composant rendu pour cette route
            }, 
            {
                path: 'profile', // Route pour la page de profil utilisateur ('/profile')
                element: <UserDashboard/> // Composant rendu pour cette route
            }
        ]
    }
])

// Définition du composant Router qui rend le RouterProvider avec la configuration du routeur
export function Router() {
    return <RouterProvider router={router} />;
}
