// Définition du type pour les props (propriétés) du composant HomePageBenefit
type HomePageBenefitProps = {
    iconUrl: string; // URL ou chemin de l'image de l'icône à afficher
    header: string; // Titre de l'avantage
    description: string; // Description de l'avantage
}

// Définition du composant fonctionnel HomePageBenefit
// Le composant accepte les propriétés de type HomePageBenefitProps
export function HomePageBenefit({ iconUrl, header, description }: HomePageBenefitProps) {
    return (
        // Conteneur principal de l'élément de l'avantage
        <div className="benefit__item">
            
            {/* Image de l'icône représentant l'avantage */}
            <img src={iconUrl} alt="Benefit Icon" className="benefit__icon" />
            
            {/* Titre de l'avantage */}
            <h3 className="benefit__item__header">{header}</h3>
            
            {/* Description de l'avantage */}
            <p>{description}</p>
        </div>
    );
}