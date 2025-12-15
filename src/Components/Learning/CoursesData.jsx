// Données complètes du parcours d'apprentissage React

export const courseData = {
  levels: [
    {
      id: "beginner",
      title: "Niveau Débutant",
      description: "Les fondamentaux du web et de React",
      icon: "🌱",
      color: "from-emerald-500 to-teal-600",
      requiredPoints: 0,
      modules: [
        {
          id: "web-basics",
          title: "Les bases du Web",
          description: "HTML, CSS et JavaScript essentiels",
          duration: "2h",
          lessons: [
            {
              id: "html-basics",
              title: "Introduction au HTML",
              type: "theory",
              content: `# Introduction au HTML

HTML (HyperText Markup Language) est le langage de base pour créer des pages web. Il définit la **structure** de votre contenu.

## Les éléments fondamentaux

### Structure de base
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Ma page</title>
  </head>
  <body>
    <h1>Bonjour le monde!</h1>
  </body>
</html>
\`\`\`

### Balises courantes
- \`<h1>\` à \`<h6>\` : Titres
- \`<p>\` : Paragraphes
- \`<div>\` : Conteneurs
- \`<span>\` : Texte en ligne
- \`<a>\` : Liens
- \`<img>\` : Images

## Points clés à retenir
1. Chaque balise ouvrante doit être fermée
2. Les attributs ajoutent des informations
3. L'indentation améliore la lisibilité`,
              points: 10
            },
            {
              id: "css-basics",
              title: "Styliser avec CSS",
              type: "theory",
              content: `# Styliser avec CSS

CSS (Cascading Style Sheets) permet de **styliser** vos pages HTML.

## Syntaxe de base

\`\`\`css
selecteur {
  propriété: valeur;
}
\`\`\`

## Exemple pratique

\`\`\`css
.container {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}

h1 {
  color: #333;
  font-size: 24px;
}
\`\`\`

## Concepts importants
- **Classes** : Réutilisables (.ma-classe)
- **IDs** : Uniques (#mon-id)
- **Flexbox** : Mise en page flexible
- **Grid** : Grilles de mise en page`,
              points: 10
            },
            {
              id: "js-essentials",
              title: "JavaScript Essentiels",
              type: "theory",
              content: `# JavaScript Essentiels

JavaScript est le langage de **programmation** du web.

## Variables

\`\`\`javascript
// Moderne (recommandé)
const PI = 3.14159;        // Constante
let compteur = 0;          // Variable modifiable

// Ancien (à éviter)
var ancienne = "valeur";
\`\`\`

## Fonctions

\`\`\`javascript
// Fonction classique
function saluer(nom) {
  return "Bonjour " + nom;
}

// Fonction fléchée (moderne)
const saluer = (nom) => "Bonjour " + nom;
\`\`\`

## Arrays et Objects

\`\`\`javascript
const fruits = ["pomme", "banane", "orange"];
const utilisateur = {
  nom: "Alice",
  age: 25
};
\`\`\`

## Méthodes importantes
- \`map()\` : Transformer chaque élément
- \`filter()\` : Filtrer les éléments
- \`find()\` : Trouver un élément
- \`reduce()\` : Réduire à une valeur`,
              points: 15
            }
          ],
          quiz: {
            id: "web-basics-quiz",
            title: "Quiz - Bases du Web",
            questions: [
              {
                id: "q1",
                question: "Quelle balise HTML est utilisée pour un titre principal ?",
                options: ["<title>", "<h1>", "<header>", "<main>"],
                correct: 1,
                explanation: "<h1> est la balise pour le titre principal d'une page."
              },
              {
                id: "q2",
                question: "Comment déclarer une variable constante en JavaScript moderne ?",
                options: ["var x = 1", "let x = 1", "const x = 1", "constant x = 1"],
                correct: 2,
                explanation: "const déclare une constante qui ne peut pas être réassignée."
              },
              {
                id: "q3",
                question: "Quelle propriété CSS définit la couleur du texte ?",
                options: ["background-color", "text-color", "color", "font-color"],
                correct: 2,
                explanation: "La propriété 'color' définit la couleur du texte."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "intro-react",
          title: "Introduction à React",
          description: "Découvrez React et son écosystème",
          duration: "1h30",
          lessons: [
            {
              id: "what-is-react",
              title: "Qu'est-ce que React ?",
              type: "theory",
              content: `# Qu'est-ce que React ?

React est une **bibliothèque JavaScript** développée par Meta (Facebook) pour créer des interfaces utilisateur.

## Pourquoi React ?

### ✅ Avantages
- **Composants réutilisables** : Créez une fois, utilisez partout
- **Virtual DOM** : Performances optimisées
- **Écosystème riche** : Nombreuses bibliothèques
- **Grande communauté** : Support et ressources

## Comment ça marche ?

React utilise un **DOM virtuel** pour optimiser les mises à jour :

1. L'état change
2. React calcule les différences
3. Seuls les éléments modifiés sont mis à jour

## Premier exemple

\`\`\`jsx
function App() {
  return (
    <div>
      <h1>Bonjour React!</h1>
      <p>Ma première application</p>
    </div>
  );
}
\`\`\``,
              points: 10
            },
            {
              id: "jsx-intro",
              title: "Comprendre JSX",
              type: "theory",
              content: `# Comprendre JSX

JSX est une extension de syntaxe JavaScript qui ressemble à HTML.

## Syntaxe de base

\`\`\`jsx
// JSX
const element = <h1>Bonjour!</h1>;

// Équivalent JavaScript
const element = React.createElement('h1', null, 'Bonjour!');
\`\`\`

## Règles importantes

### 1. Un seul élément parent
\`\`\`jsx
// ❌ Incorrect
return (
  <h1>Titre</h1>
  <p>Paragraphe</p>
);

// ✅ Correct
return (
  <div>
    <h1>Titre</h1>
    <p>Paragraphe</p>
  </div>
);
\`\`\`

### 2. Expressions JavaScript avec {}
\`\`\`jsx
const nom = "Alice";
return <h1>Bonjour {nom}!</h1>;
\`\`\`

### 3. className au lieu de class
\`\`\`jsx
<div className="container">...</div>
\`\`\``,
              points: 15,
              exercise: {
                id: "jsx-exercise",
                title: "Créer un élément JSX",
                instructions: "Créez un composant qui affiche votre nom et un message de bienvenue.",
                starterCode: `function Welcome() {
  // Créez une variable 'nom' avec votre nom
  // Retournez un div contenant:
  // - Un h1 avec "Bienvenue"
  // - Un p avec "Je m'appelle [votre nom]"
  
  return null;
}`,
                solution: `function Welcome() {
  const nom = "Alice";
  
  return (
    <div>
      <h1>Bienvenue</h1>
      <p>Je m'appelle {nom}</p>
    </div>
  );
}`,
                tests: [
                  { description: "Le composant retourne un élément", check: "returns_element" },
                  { description: "Contient un h1", check: "contains_h1" },
                  { description: "Affiche un nom", check: "displays_name" }
                ]
              }
            }
          ],
          quiz: {
            id: "intro-react-quiz",
            title: "Quiz - Introduction React",
            questions: [
              {
                id: "q1",
                question: "Qui a développé React ?",
                options: ["Google", "Microsoft", "Meta (Facebook)", "Apple"],
                correct: 2,
                explanation: "React a été développé par Meta (anciennement Facebook)."
              },
              {
                id: "q2",
                question: "Comment insérer une expression JavaScript dans JSX ?",
                options: ["${expression}", "{expression}", "{{expression}}", "(expression)"],
                correct: 1,
                explanation: "Les accolades simples {} permettent d'insérer du JavaScript dans JSX."
              },
              {
                id: "q3",
                question: "Quelle est la bonne façon d'appliquer une classe CSS en JSX ?",
                options: ["class='...'", "className='...'", "cssClass='...'", "style='...'"],
                correct: 1,
                explanation: "En JSX, on utilise className au lieu de class (mot réservé en JS)."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "components",
          title: "Composants React",
          description: "Créer et organiser vos composants",
          duration: "2h",
          lessons: [
            {
              id: "function-components",
              title: "Composants fonctionnels",
              type: "theory",
              content: `# Composants fonctionnels

Les composants sont les **briques de base** de React.

## Définition

Un composant est une fonction qui retourne du JSX :

\`\`\`jsx
function MonComposant() {
  return <div>Contenu</div>;
}
\`\`\`

## Conventions
- Nom en **PascalCase** (MonComposant)
- Un composant par fichier
- Export du composant

## Composition

Les composants peuvent s'imbriquer :

\`\`\`jsx
function Header() {
  return <header><h1>Mon Site</h1></header>;
}

function App() {
  return (
    <div>
      <Header />
      <main>Contenu principal</main>
    </div>
  );
}
\`\`\``,
              points: 15,
              exercise: {
                id: "component-exercise",
                title: "Créer un composant Card",
                instructions: "Créez un composant Card qui affiche un titre et une description.",
                starterCode: `function Card() {
  // Retournez une div avec:
  // - className="card"
  // - Un h2 avec le titre "Ma Carte"
  // - Un p avec "Description de la carte"
  
  return null;
}`,
                solution: `function Card() {
  return (
    <div className="card">
      <h2>Ma Carte</h2>
      <p>Description de la carte</p>
    </div>
  );
}`,
                tests: [
                  { description: "Retourne un div", check: "returns_div" },
                  { description: "A la classe 'card'", check: "has_class_card" },
                  { description: "Contient h2 et p", check: "has_h2_and_p" }
                ]
              }
            },
            {
              id: "props",
              title: "Les Props",
              type: "theory",
              content: `# Les Props

Les props permettent de **passer des données** aux composants.

## Utilisation

\`\`\`jsx
// Définition du composant
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Bonjour {name}!</h1>
      <p>Tu as {age} ans</p>
    </div>
  );
}

// Utilisation
<Greeting name="Alice" age={25} />
\`\`\`

## Props enfants (children)

\`\`\`jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

<Card title="Mon titre">
  <p>Contenu de la carte</p>
</Card>
\`\`\`

## Valeurs par défaut

\`\`\`jsx
function Button({ text = "Cliquer", color = "blue" }) {
  return <button style={{ backgroundColor: color }}>{text}</button>;
}
\`\`\``,
              points: 20,
              exercise: {
                id: "props-exercise",
                title: "Composant avec Props",
                instructions: "Créez un composant UserCard qui reçoit name et email en props.",
                starterCode: `function UserCard(props) {
  // Destructurez les props: name et email
  // Retournez une div avec:
  // - Un h3 affichant le nom
  // - Un p affichant l'email
  
  return null;
}`,
                solution: `function UserCard({ name, email }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}`,
                tests: [
                  { description: "Affiche le nom passé en prop", check: "displays_name_prop" },
                  { description: "Affiche l'email passé en prop", check: "displays_email_prop" }
                ]
              }
            },
            {
              id: "state",
              title: "L'état (State)",
              type: "theory",
              content: `# L'état (State)

Le state permet de gérer des **données dynamiques** dans un composant.

## useState

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}
\`\`\`

## Règles importantes

1. **Ne jamais modifier le state directement**
\`\`\`jsx
// ❌ Incorrect
count = count + 1;

// ✅ Correct
setCount(count + 1);
\`\`\`

2. **Mise à jour basée sur l'état précédent**
\`\`\`jsx
setCount(prevCount => prevCount + 1);
\`\`\`

3. **State avec objets**
\`\`\`jsx
const [user, setUser] = useState({ name: '', age: 0 });

// Mise à jour partielle
setUser(prev => ({ ...prev, name: 'Alice' }));
\`\`\``,
              points: 25,
              exercise: {
                id: "state-exercise",
                title: "Compteur interactif",
                instructions: "Créez un compteur avec des boutons pour incrémenter et décrémenter.",
                starterCode: `function Counter() {
  // 1. Créez un state 'count' initialisé à 0
  // 2. Créez une fonction increment
  // 3. Créez une fonction decrement
  // 4. Retournez l'interface
  
  return null;
}`,
                solution: `function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return (
    <div>
      <h2>Compteur: {count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}`,
                tests: [
                  { description: "Affiche le compteur", check: "displays_count" },
                  { description: "Bouton + fonctionne", check: "increment_works" },
                  { description: "Bouton - fonctionne", check: "decrement_works" }
                ]
              }
            }
          ],
          quiz: {
            id: "components-quiz",
            title: "Quiz - Composants",
            questions: [
              {
                id: "q1",
                question: "Quelle convention de nommage pour les composants React ?",
                options: ["camelCase", "snake_case", "PascalCase", "kebab-case"],
                correct: 2,
                explanation: "Les composants React utilisent le PascalCase (ex: MonComposant)."
              },
              {
                id: "q2",
                question: "Comment passer une valeur numérique en prop ?",
                options: ["age='25'", "age={25}", "age=(25)", "age=25"],
                correct: 1,
                explanation: "Les valeurs non-string doivent être entre accolades: age={25}."
              },
              {
                id: "q3",
                question: "Que retourne useState ?",
                options: [
                  "La valeur uniquement",
                  "Une fonction uniquement",
                  "Un tableau [valeur, fonction]",
                  "Un objet {value, setter}"
                ],
                correct: 2,
                explanation: "useState retourne un tableau avec la valeur et la fonction setter."
              },
              {
                id: "q4",
                question: "Comment accéder aux enfants d'un composant ?",
                options: ["props.content", "props.children", "props.inner", "props.elements"],
                correct: 1,
                explanation: "Les éléments enfants sont accessibles via props.children."
              }
            ],
            passingScore: 75
          }
        },
        {
          id: "rendering",
          title: "Rendu conditionnel et Listes",
          description: "Afficher dynamiquement du contenu",
          duration: "1h30",
          lessons: [
            {
              id: "conditional-rendering",
              title: "Rendu conditionnel",
              type: "theory",
              content: `# Rendu conditionnel

Afficher différents éléments selon des conditions.

## Opérateur ternaire

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Bienvenue!</h1>
      ) : (
        <h1>Veuillez vous connecter</h1>
      )}
    </div>
  );
}
\`\`\`

## Opérateur &&

\`\`\`jsx
function Notification({ count }) {
  return (
    <div>
      {count > 0 && (
        <span className="badge">{count}</span>
      )}
    </div>
  );
}
\`\`\`

## Early return

\`\`\`jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>Chargement...</p>;
  }
  
  return <h1>{user.name}</h1>;
}
\`\`\``,
              points: 15
            },
            {
              id: "lists-keys",
              title: "Listes et Keys",
              type: "theory",
              content: `# Listes et Keys

Afficher des listes d'éléments avec map().

## Afficher une liste

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

## Importance des keys

Les keys aident React à identifier les éléments modifiés.

\`\`\`jsx
// ❌ Mauvais (index comme key)
{items.map((item, index) => (
  <Item key={index} />
))}

// ✅ Bon (ID unique)
{items.map(item => (
  <Item key={item.id} />
))}
\`\`\`

## Liste avec composant

\`\`\`jsx
function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard 
          key={user.id}
          name={user.name}
          email={user.email}
        />
      ))}
    </div>
  );
}
\`\`\``,
              points: 20,
              exercise: {
                id: "list-exercise",
                title: "Afficher une liste de produits",
                instructions: "Créez un composant qui affiche une liste de produits avec leur nom et prix.",
                starterCode: `const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 499 }
];

function ProductList() {
  // Utilisez map() pour afficher chaque produit
  // Chaque élément doit avoir une key unique
  // Affichez le nom et le prix
  
  return null;
}`,
                solution: `const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 499 }
];

function ProductList() {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - {product.price}€
        </li>
      ))}
    </ul>
  );
}`,
                tests: [
                  { description: "Utilise map()", check: "uses_map" },
                  { description: "Chaque élément a une key", check: "has_keys" },
                  { description: "Affiche tous les produits", check: "displays_all" }
                ]
              }
            }
          ],
          quiz: {
            id: "rendering-quiz",
            title: "Quiz - Rendu",
            questions: [
              {
                id: "q1",
                question: "Quel opérateur pour afficher un élément seulement si une condition est vraie ?",
                options: ["||", "&&", "??", "?:"],
                correct: 1,
                explanation: "L'opérateur && affiche l'élément si la condition est vraie."
              },
              {
                id: "q2",
                question: "Pourquoi les keys sont-elles importantes ?",
                options: [
                  "Pour le style CSS",
                  "Pour identifier les éléments modifiés",
                  "Pour l'accessibilité",
                  "Pour le SEO"
                ],
                correct: 1,
                explanation: "Les keys aident React à optimiser le rendu en identifiant les changements."
              }
            ],
            passingScore: 70
          }
        }
      ]
    },
    {
      id: "intermediate",
      title: "Niveau Intermédiaire",
      description: "Hooks, routing et gestion des données",
      icon: "🚀",
      color: "from-blue-500 to-indigo-600",
      requiredPoints: 100,
      modules: [
        {
          id: "hooks-basics",
          title: "Hooks de base",
          description: "useState et useEffect en profondeur",
          duration: "2h30",
          lessons: [
            {
              id: "usestate-advanced",
              title: "useState avancé",
              type: "theory",
              content: `# useState avancé

Techniques avancées avec useState.

## Initialisation paresseuse

\`\`\`jsx
// ❌ S'exécute à chaque rendu
const [data, setData] = useState(expensiveComputation());

// ✅ S'exécute une seule fois
const [data, setData] = useState(() => expensiveComputation());
\`\`\`

## État avec objets complexes

\`\`\`jsx
const [form, setForm] = useState({
  name: '',
  email: '',
  preferences: { theme: 'dark', notifications: true }
});

// Mise à jour imbriquée
const updateTheme = (theme) => {
  setForm(prev => ({
    ...prev,
    preferences: { ...prev.preferences, theme }
  }));
};
\`\`\`

## Plusieurs états vs un objet

\`\`\`jsx
// Option 1: États séparés
const [name, setName] = useState('');
const [email, setEmail] = useState('');

// Option 2: Objet unique
const [form, setForm] = useState({ name: '', email: '' });
\`\`\`

Préférez les états séparés pour les valeurs indépendantes.`,
              points: 20
            },
            {
              id: "useeffect-deep",
              title: "useEffect en profondeur",
              type: "theory",
              content: `# useEffect en profondeur

useEffect gère les **effets de bord** : API, subscriptions, DOM...

## Syntaxe complète

\`\`\`jsx
useEffect(() => {
  // Code de l'effet
  
  return () => {
    // Nettoyage (optionnel)
  };
}, [dependencies]);
\`\`\`

## Quand s'exécute-t-il ?

\`\`\`jsx
// À chaque rendu
useEffect(() => { ... });

// Une seule fois (montage)
useEffect(() => { ... }, []);

// Quand 'count' change
useEffect(() => { ... }, [count]);
\`\`\`

## Exemple : Appel API

\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Chargement...</p>;
  return <h1>{user.name}</h1>;
}
\`\`\`

## Nettoyage

\`\`\`jsx
useEffect(() => {
  const subscription = dataSource.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
\`\`\``,
              points: 25,
              exercise: {
                id: "useeffect-exercise",
                title: "Timer avec useEffect",
                instructions: "Créez un composant Timer qui compte les secondes.",
                starterCode: `function Timer() {
  // 1. Créez un state 'seconds'
  // 2. Utilisez useEffect avec setInterval
  // 3. N'oubliez pas le cleanup!
  
  return null;
}`,
                solution: `function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h1>Temps: {seconds}s</h1>;
}`,
                tests: [
                  { description: "Affiche les secondes", check: "displays_seconds" },
                  { description: "Utilise setInterval", check: "uses_interval" },
                  { description: "Nettoie avec clearInterval", check: "has_cleanup" }
                ]
              }
            }
          ],
          quiz: {
            id: "hooks-basics-quiz",
            title: "Quiz - Hooks de base",
            questions: [
              {
                id: "q1",
                question: "Quand useEffect avec [] vide s'exécute-t-il ?",
                options: ["À chaque rendu", "Au montage uniquement", "Jamais", "Au démontage"],
                correct: 1,
                explanation: "Un tableau vide signifie que l'effet ne dépend d'aucune valeur, donc s'exécute au montage."
              },
              {
                id: "q2",
                question: "Que retourne la fonction dans useEffect ?",
                options: ["La nouvelle valeur", "Une fonction de nettoyage", "Un booléen", "Rien"],
                correct: 1,
                explanation: "La fonction retournée est appelée pour nettoyer l'effet précédent."
              },
              {
                id: "q3",
                question: "Comment éviter un calcul coûteux à chaque rendu avec useState ?",
                options: [
                  "useState(value)",
                  "useState(() => value)",
                  "useMemo(value)",
                  "useCallback(value)"
                ],
                correct: 1,
                explanation: "Passer une fonction à useState permet une initialisation paresseuse."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "forms",
          title: "Gestion des formulaires",
          description: "Formulaires contrôlés et validation",
          duration: "2h",
          lessons: [
            {
              id: "controlled-forms",
              title: "Formulaires contrôlés",
              type: "theory",
              content: `# Formulaires contrôlés

React contrôle la valeur des inputs via le state.

## Input simple

\`\`\`jsx
function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nom soumis:', name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}
\`\`\`

## Formulaire complet

\`\`\`jsx
function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
    </form>
  );
}
\`\`\``,
              points: 20,
              exercise: {
                id: "form-exercise",
                title: "Formulaire de contact",
                instructions: "Créez un formulaire de contact avec nom, email et message.",
                starterCode: `function ContactForm() {
  // 1. Créez un state pour le formulaire
  // 2. Gérez les changements d'input
  // 3. Gérez la soumission
  
  return null;
}`,
                solution: `function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}`,
                tests: [
                  { description: "A 3 champs de formulaire", check: "has_three_fields" },
                  { description: "Gère onChange", check: "handles_change" },
                  { description: "Gère onSubmit", check: "handles_submit" }
                ]
              }
            }
          ],
          quiz: {
            id: "forms-quiz",
            title: "Quiz - Formulaires",
            questions: [
              {
                id: "q1",
                question: "Qu'est-ce qu'un formulaire contrôlé ?",
                options: [
                  "Un formulaire stylisé",
                  "Un formulaire dont la valeur est gérée par React",
                  "Un formulaire validé",
                  "Un formulaire avec reCAPTCHA"
                ],
                correct: 1,
                explanation: "Un formulaire contrôlé a ses valeurs synchronisées avec le state React."
              },
              {
                id: "q2",
                question: "Comment empêcher le rechargement de la page à la soumission ?",
                options: [
                  "return false",
                  "e.preventDefault()",
                  "e.stopPropagation()",
                  "onSubmit={false}"
                ],
                correct: 1,
                explanation: "e.preventDefault() empêche le comportement par défaut du formulaire."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "react-router",
          title: "React Router",
          description: "Navigation et routing dans React",
          duration: "2h",
          lessons: [
            {
              id: "routing-basics",
              title: "Bases du routing",
              type: "theory",
              content: `# React Router

React Router permet la navigation entre pages.

## Configuration

\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## Navigation

\`\`\`jsx
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/about">À propos</Link>
      <button onClick={() => navigate('/contact')}>
        Contact
      </button>
    </nav>
  );
}
\`\`\`

## Paramètres d'URL

\`\`\`jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  
  return <h1>Profil utilisateur: {id}</h1>;
}
\`\`\``,
              points: 25
            }
          ],
          quiz: {
            id: "router-quiz",
            title: "Quiz - React Router",
            questions: [
              {
                id: "q1",
                question: "Quel composant utiliser pour les liens de navigation ?",
                options: ["<a>", "<Link>", "<NavLink>", "<Route>"],
                correct: 1,
                explanation: "Link est le composant de React Router pour la navigation sans rechargement."
              },
              {
                id: "q2",
                question: "Comment récupérer un paramètre d'URL comme /users/:id ?",
                options: ["useParams()", "useLocation()", "useNavigate()", "useRoute()"],
                correct: 0,
                explanation: "useParams() retourne les paramètres dynamiques de l'URL."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "api-calls",
          title: "Appels API",
          description: "Communiquer avec un serveur",
          duration: "2h30",
          lessons: [
            {
              id: "fetch-api",
              title: "Utiliser fetch",
              type: "theory",
              content: `# Appels API avec fetch

Récupérer et envoyer des données à un serveur.

## GET Request

\`\`\`jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## POST Request

\`\`\`jsx
const createUser = async (userData) => {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  return response.json();
};
\`\`\`

## Async/Await

\`\`\`jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/data');
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
\`\`\``,
              points: 30,
              exercise: {
                id: "api-exercise",
                title: "Charger des données",
                instructions: "Créez un composant qui charge et affiche une liste de posts.",
                starterCode: `function PostList() {
  // 1. États: posts, loading, error
  // 2. useEffect pour charger les données
  // 3. Afficher loading/error/posts
  // URL: https://jsonplaceholder.typicode.com/posts
  
  return null;
}`,
                solution: `function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.slice(0, 10));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}`,
                tests: [
                  { description: "Gère le loading", check: "handles_loading" },
                  { description: "Gère les erreurs", check: "handles_error" },
                  { description: "Affiche les posts", check: "displays_posts" }
                ]
              }
            }
          ],
          quiz: {
            id: "api-quiz",
            title: "Quiz - Appels API",
            questions: [
              {
                id: "q1",
                question: "Quelle méthode HTTP pour récupérer des données ?",
                options: ["POST", "GET", "PUT", "DELETE"],
                correct: 1,
                explanation: "GET est utilisé pour récupérer des ressources."
              },
              {
                id: "q2",
                question: "Comment envoyer des données JSON avec fetch ?",
                options: [
                  "body: data",
                  "body: JSON.stringify(data)",
                  "json: data",
                  "data: data"
                ],
                correct: 1,
                explanation: "Les données doivent être sérialisées avec JSON.stringify()."
              }
            ],
            passingScore: 70
          }
        }
      ]
    },
    {
      id: "advanced",
      title: "Niveau Avancé",
      description: "Performance, patterns et tests",
      icon: "⚡",
      color: "from-purple-500 to-pink-600",
      requiredPoints: 250,
      modules: [
        {
          id: "advanced-hooks",
          title: "Hooks avancés",
          description: "useMemo, useCallback, useRef",
          duration: "3h",
          lessons: [
            {
              id: "usememo",
              title: "useMemo",
              type: "theory",
              content: `# useMemo

useMemo **mémorise** le résultat d'un calcul coûteux.

## Problème

\`\`\`jsx
function ExpensiveComponent({ items, filter }) {
  // Recalculé à chaque rendu 😱
  const filteredItems = items.filter(item => 
    item.name.includes(filter)
  );
  
  return <List items={filteredItems} />;
}
\`\`\`

## Solution avec useMemo

\`\`\`jsx
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Calcul...');
    return items.filter(item => 
      item.name.includes(filter)
    );
  }, [items, filter]); // Recalcule seulement si items ou filter change
  
  return <List items={filteredItems} />;
}
\`\`\`

## Quand l'utiliser ?

✅ Calculs coûteux
✅ Objets/tableaux passés en props
✅ Dépendances de useEffect

❌ Calculs simples
❌ Optimisation prématurée`,
              points: 25
            },
            {
              id: "usecallback",
              title: "useCallback",
              type: "theory",
              content: `# useCallback

useCallback **mémorise** une fonction.

## Problème

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  // Nouvelle fonction à chaque rendu
  const handleClick = () => {
    console.log('Click!');
  };
  
  // Child re-rendu inutilement
  return <Child onClick={handleClick} />;
}
\`\`\`

## Solution

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Click!');
  }, []); // Fonction stable
  
  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log('Child rendu');
  return <button onClick={onClick}>Click</button>;
});
\`\`\`

## Avec dépendances

\`\`\`jsx
const handleSubmit = useCallback((data) => {
  submitForm(userId, data);
}, [userId]); // Nouvelle fonction si userId change
\`\`\``,
              points: 25
            },
            {
              id: "useref",
              title: "useRef",
              type: "theory",
              content: `# useRef

useRef crée une référence **persistante** entre les rendus.

## Accéder au DOM

\`\`\`jsx
function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
\`\`\`

## Stocker des valeurs

\`\`\`jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  
  const start = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
  };
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
\`\`\`

## Différence avec useState

- useState → re-rendu quand la valeur change
- useRef → pas de re-rendu`,
              points: 25,
              exercise: {
                id: "useref-exercise",
                title: "Input avec focus automatique",
                instructions: "Créez un champ de recherche qui se focus automatiquement au montage.",
                starterCode: `function SearchInput() {
  // 1. Créez une ref pour l'input
  // 2. Focus au montage avec useEffect
  
  return null;
}`,
                solution: `function SearchInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Rechercher..."
    />
  );
}`,
                tests: [
                  { description: "Utilise useRef", check: "uses_useref" },
                  { description: "Focus au montage", check: "focuses_on_mount" }
                ]
              }
            }
          ],
          quiz: {
            id: "advanced-hooks-quiz",
            title: "Quiz - Hooks avancés",
            questions: [
              {
                id: "q1",
                question: "Quelle est la différence entre useMemo et useCallback ?",
                options: [
                  "Aucune différence",
                  "useMemo mémorise une valeur, useCallback une fonction",
                  "useCallback est plus rapide",
                  "useMemo est déprécié"
                ],
                correct: 1,
                explanation: "useMemo retourne une valeur mémorisée, useCallback retourne une fonction mémorisée."
              },
              {
                id: "q2",
                question: "Quand useRef déclenche-t-il un re-rendu ?",
                options: ["À chaque changement", "Jamais", "Au montage", "Au démontage"],
                correct: 1,
                explanation: "Changer ref.current ne déclenche jamais de re-rendu."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "context-api",
          title: "Context API",
          description: "Gérer l'état global",
          duration: "2h30",
          lessons: [
            {
              id: "context-basics",
              title: "Créer et utiliser un Context",
              type: "theory",
              content: `# Context API

Context permet de partager des données sans prop drilling.

## Créer un Context

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// 1. Créer le context
const ThemeContext = createContext();

// 2. Créer le provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook personnalisé
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans ThemeProvider');
  }
  return context;
}
\`\`\`

## Utilisation

\`\`\`jsx
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Thème: {theme}
      </button>
    </header>
  );
}
\`\`\``,
              points: 30,
              exercise: {
                id: "context-exercise",
                title: "Context d'authentification",
                instructions: "Créez un AuthContext pour gérer l'utilisateur connecté.",
                starterCode: `// 1. Créez AuthContext
// 2. Créez AuthProvider avec user et login/logout
// 3. Créez useAuth hook

function LoginButton() {
  // Utilisez useAuth pour afficher login/logout
  return null;
}`,
                solution: `const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function LoginButton() {
  const { user, login, logout } = useAuth();

  if (user) {
    return (
      <div>
        <span>Bonjour {user.name}</span>
        <button onClick={logout}>Déconnexion</button>
      </div>
    );
  }

  return (
    <button onClick={() => login({ name: 'Alice' })}>
      Connexion
    </button>
  );
}`,
                tests: [
                  { description: "Context créé", check: "has_context" },
                  { description: "Provider avec value", check: "has_provider" },
                  { description: "Hook useAuth", check: "has_hook" }
                ]
              }
            }
          ],
          quiz: {
            id: "context-quiz",
            title: "Quiz - Context API",
            questions: [
              {
                id: "q1",
                question: "Quel problème résout Context API ?",
                options: ["Performance", "Prop drilling", "Styling", "Routing"],
                correct: 1,
                explanation: "Context évite de passer des props à travers de nombreux niveaux de composants."
              },
              {
                id: "q2",
                question: "Où placer le Provider dans l'arbre de composants ?",
                options: [
                  "N'importe où",
                  "Au-dessus des composants qui consomment le context",
                  "Au plus bas niveau",
                  "Uniquement dans App"
                ],
                correct: 1,
                explanation: "Le Provider doit être parent de tous les composants qui utilisent le context."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "performance",
          title: "Performance",
          description: "Optimiser vos applications React",
          duration: "2h",
          lessons: [
            {
              id: "react-memo",
              title: "React.memo",
              type: "theory",
              content: `# React.memo

React.memo empêche les re-rendus inutiles.

## Problème

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        {count}
      </button>
      {/* Re-rendu à chaque clic du parent 😱 */}
      <ExpensiveChild />
    </div>
  );
}
\`\`\`

## Solution

\`\`\`jsx
const ExpensiveChild = React.memo(function ExpensiveChild() {
  console.log('Rendu ExpensiveChild');
  return <div>Composant coûteux</div>;
});
\`\`\`

## Comparaison personnalisée

\`\`\`jsx
const MyComponent = React.memo(
  function MyComponent({ data }) {
    return <div>{data.name}</div>;
  },
  (prevProps, nextProps) => {
    // true = ne pas re-rendre
    return prevProps.data.id === nextProps.data.id;
  }
);
\`\`\`

## Bonnes pratiques

✅ Composants purs avec props stables
✅ Listes avec beaucoup d'éléments
✅ Composants coûteux en rendu

❌ Composants simples
❌ Props qui changent souvent`,
              points: 25
            },
            {
              id: "code-splitting",
              title: "Code Splitting",
              type: "theory",
              content: `# Code Splitting

Charger le code à la demande pour des performances optimales.

## React.lazy

\`\`\`jsx
import { lazy, Suspense } from 'react';

// Chargé uniquement quand nécessaire
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

## Routes lazy

\`\`\`jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

## Suspense avec loading states

\`\`\`jsx
function App() {
  return (
    <Suspense 
      fallback={
        <div className="loading-container">
          <Spinner />
          <p>Chargement du module...</p>
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  );
}
\`\`\``,
              points: 20
            }
          ],
          quiz: {
            id: "performance-quiz",
            title: "Quiz - Performance",
            questions: [
              {
                id: "q1",
                question: "Que fait React.memo ?",
                options: [
                  "Mémorise les valeurs",
                  "Empêche les re-rendus si les props n'ont pas changé",
                  "Optimise les styles",
                  "Cache les données API"
                ],
                correct: 1,
                explanation: "React.memo compare les props et évite le re-rendu si elles sont identiques."
              },
              {
                id: "q2",
                question: "Quel composant accompagne React.lazy ?",
                options: ["Loading", "Suspense", "Fallback", "Lazy"],
                correct: 1,
                explanation: "Suspense affiche un fallback pendant le chargement du composant lazy."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "patterns",
          title: "Patterns avancés",
          description: "HOC, Render Props, Custom Hooks",
          duration: "3h",
          lessons: [
            {
              id: "custom-hooks",
              title: "Custom Hooks",
              type: "theory",
              content: `# Custom Hooks

Créez vos propres hooks pour réutiliser la logique.

## Exemple : useLocalStorage

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Utilisation
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Thème: {theme}
    </button>
  );
}
\`\`\`

## Exemple : useFetch

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Utilisation
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(\`/api/users/\${userId}\`);
  
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur!</p>;
  return <h1>{user.name}</h1>;
}
\`\`\`

## Règles des hooks
1. Nom commence par "use"
2. Peut utiliser d'autres hooks
3. Respecter les règles des hooks (pas de conditions)`,
              points: 35,
              exercise: {
                id: "custom-hook-exercise",
                title: "Hook useToggle",
                instructions: "Créez un hook useToggle pour gérer un état booléen.",
                starterCode: `function useToggle(initialValue = false) {
  // 1. Créez le state
  // 2. Créez la fonction toggle
  // 3. Retournez [value, toggle]
  
  return [];
}

// Test
function App() {
  const [isOpen, toggle] = useToggle(false);
  
  return (
    <div>
      <p>{isOpen ? 'Ouvert' : 'Fermé'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}`,
                solution: `function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle];
}

function App() {
  const [isOpen, toggle] = useToggle(false);
  
  return (
    <div>
      <p>{isOpen ? 'Ouvert' : 'Fermé'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}`,
                tests: [
                  { description: "Retourne un tableau [value, toggle]", check: "returns_array" },
                  { description: "toggle inverse la valeur", check: "toggle_works" }
                ]
              }
            },
            {
              id: "hoc",
              title: "Higher-Order Components",
              type: "theory",
              content: `# Higher-Order Components (HOC)

Un HOC est une fonction qui prend un composant et retourne un nouveau composant.

## Exemple : withAuth

\`\`\`jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth();
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// Utilisation
const ProtectedDashboard = withAuth(Dashboard);
\`\`\`

## Exemple : withLoading

\`\`\`jsx
function withLoading(WrappedComponent) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <Spinner />;
    }
    
    return <WrappedComponent {...props} />;
  };
}
\`\`\`

## Conventions
- Préfixe "with"
- Passer toutes les props
- Ne pas modifier le composant original`,
              points: 25
            }
          ],
          quiz: {
            id: "patterns-quiz",
            title: "Quiz - Patterns",
            questions: [
              {
                id: "q1",
                question: "Par quelle convention commence le nom d'un custom hook ?",
                options: ["get", "use", "hook", "custom"],
                correct: 1,
                explanation: "Les hooks personnalisés commencent par 'use' (ex: useLocalStorage)."
              },
              {
                id: "q2",
                question: "Qu'est-ce qu'un HOC ?",
                options: [
                  "Un composant React",
                  "Une fonction qui retourne un composant",
                  "Un hook",
                  "Un pattern CSS"
                ],
                correct: 1,
                explanation: "Un HOC prend un composant en entrée et retourne un composant amélioré."
              }
            ],
            passingScore: 70
          }
        },
        {
          id: "testing",
          title: "Tests unitaires",
          description: "Jest et React Testing Library",
          duration: "3h",
          lessons: [
            {
              id: "testing-basics",
              title: "Introduction aux tests",
              type: "theory",
              content: `# Tests avec React Testing Library

Testez vos composants React de manière fiable.

## Configuration

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';
\`\`\`

## Test basique

\`\`\`jsx
test('affiche le compteur initial', () => {
  render(<Counter />);
  
  expect(screen.getByText('Compteur: 0')).toBeInTheDocument();
});
\`\`\`

## Test d'interaction

\`\`\`jsx
test('incrémente au clic', () => {
  render(<Counter />);
  
  const button = screen.getByRole('button', { name: '+' });
  fireEvent.click(button);
  
  expect(screen.getByText('Compteur: 1')).toBeInTheDocument();
});
\`\`\`

## Requêtes principales

- \`getByText\` : Trouver par texte
- \`getByRole\` : Trouver par rôle ARIA
- \`getByLabelText\` : Trouver par label
- \`getByTestId\` : Trouver par data-testid

## Async testing

\`\`\`jsx
test('charge les données', async () => {
  render(<UserList />);
  
  // Attendre que les données apparaissent
  await screen.findByText('Alice');
  
  expect(screen.getByText('Alice')).toBeInTheDocument();
});
\`\`\``,
              points: 30
            }
          ],
          quiz: {
            id: "testing-quiz",
            title: "Quiz - Tests",
            questions: [
              {
                id: "q1",
                question: "Quelle méthode pour simuler un clic ?",
                options: ["click()", "fireEvent.click()", "simulate.click()", "trigger.click()"],
                correct: 1,
                explanation: "fireEvent.click() simule un événement de clic sur un élément."
              },
              {
                id: "q2",
                question: "Comment trouver un bouton par son texte ?",
                options: [
                  "getByText('Mon bouton')",
                  "getByRole('button', { name: 'Mon bouton' })",
                  "Les deux sont corrects",
                  "querySelector('button')"
                ],
                correct: 2,
                explanation: "Les deux méthodes fonctionnent, getByRole est préféré pour l'accessibilité."
              }
            ],
            passingScore: 70
          }
        }
      ]
    }
  ],
  
  badges: [
    { id: "first-lesson", name: "Premier pas", icon: "🎯", description: "Compléter votre première leçon" },
    { id: "first-module", name: "Module maîtrisé", icon: "📚", description: "Compléter un module entier" },
    { id: "quiz-master", name: "Quiz Master", icon: "🏆", description: "Obtenir 100% à un quiz" },
    { id: "beginner-complete", name: "Débutant accompli", icon: "🌱", description: "Terminer le niveau débutant" },
    { id: "intermediate-complete", name: "Développeur confirmé", icon: "🚀", description: "Terminer le niveau intermédiaire" },
    { id: "advanced-complete", name: "Expert React", icon: "⚡", description: "Terminer le niveau avancé" },
    { id: "all-exercises", name: "Pratique parfaite", icon: "💻", description: "Compléter tous les exercices" },
    { id: "certified", name: "Certifié React", icon: "🎓", description: "Obtenir le certificat final" }
  ]
};

export default courseData;
