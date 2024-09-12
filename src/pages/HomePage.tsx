// Importation des icônes depuis les assets
import iconChat from '../assets/iconchat.png';
import iconMoney from '../assets/iconmoney.png';
import iconSecurity from '../assets/iconsecurity.png';

// Importation des composants Hero et HomePageFeature
import {MainBanner } from '../components/Hero';
import { HomePageBenefit } from '../components/Homepage';

// Définition du composant fonctionnel HomePage
export function HomePage() {
    return (
        <main>
            {/* Affichage du composant Hero */}
            <MainBanner />
            
            {/* Section des fonctionnalités principales de la page d'accueil */}
            <section >
                <h2 >Features</h2> {/* Titre caché pour l'accessibilité */}
                
                {/* Affichage de la première fonctionnalité avec l'icône de chat */}
                <HomePageBenefit
                    iconUrl={iconChat}
                    header="You are our #1 priority"
                    description="Need to talk to a representative? You can get in touch through our
                    24/7 chat or through a phone call in less than 5 minutes."
                />

                {/* Affichage de la deuxième fonctionnalité avec l'icône de l'argent */}
                <HomePageBenefit
                    iconUrl={iconMoney}
                    header="More savings means higher rates"
                    description="The more you save with us, the higher your interest rate will be!"
                />

                {/* Affichage de la troisième fonctionnalité avec l'icône de la sécurité */}
                <HomePageBenefit
                    iconUrl={iconSecurity}
                    header="Security you can trust"
                    description="We use top of the line encryption to make sure your data and money
                    is always safe."
                />
            </section>
        </main>
    );
}