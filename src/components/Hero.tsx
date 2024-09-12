// Définition du composant fonctionnel MainBanner
export function MainBanner() {
  return (
    // Conteneur principal du composant MainBanner
    <div className="main-banner">
      
      {/* Section qui encapsule le contenu principal du MainBanner */}
      <section className="main-banner__body">
        
        {/* Titre de niveau 2 caché visuellement mais accessible aux technologies d'assistance */}
        <h2 className="sr-only">Promoted Content</h2>
        
        {/* Paragraphes avec des sous-titres pour promouvoir les avantages */}
        <p className="highlight">No fees.</p> {/* Aucune commission */}
        <p className="highlight">No minimum deposit.</p> {/* Aucun dépôt minimum */}
        <p className="highlight">High interest rates.</p> {/* Taux d'intérêt élevés */}
        
        {/* Texte promotionnel invitant à ouvrir un compte */}
        <p className="promotion-text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
}