// Définition du composant fonctionnel AppFooter
export function AppFooter() {
    return (
        // Balise <footer> pour encapsuler le contenu du pied de page
        <footer className="app-footer">
            {/* Paragraphe contenant le texte du copyright, stylisé avec la classe CSS app-footer__content */}
            <p className="app-footer__content">Copyright 2020 Argent Bank</p>
        </footer>
    );
}