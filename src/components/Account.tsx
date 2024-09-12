// Définition du type pour les props (propriétés) du composant AccountItem
type AccountItemProps = {
    header: string; // Le titre de l'élément de compte (par exemple, "Argent Bank Checking")
    balance: string; // Le montant associé à ce compte (par exemple, "$2,082.79")
    details: string; // Une description du montant (par exemple, "Available Balance")
}

// Définition du composant fonctionnel AccountItem
// Le composant accepte les propriétés de type AccountItemProps
export const AccountItem = ({ header, balance, details }: AccountItemProps) => {
    return (
        <section className="account-item">
            {/* Contenu principal de l'élément de compte */}
            <div className="account-item__body">
                {/* Affichage du titre du compte */}
                <h3 className="account-item__body__header">{header}</h3>
                
                {/* Affichage du montant du compte */}
                <p className="account-item__body__balance">{balance}</p>
                
                {/* Affichage de la description du montant */}
                <p className="account-item__body__balance__details">{details}</p>
            </div>

            {/* Section d'appel à l'action (Call to Action) */}
            <div className="account-item__body cta">
                {/* Bouton pour voir les transactions associées au compte */}
                <button className="view-transactions__button">View transactions</button>
            </div>
        </section>
    );
}