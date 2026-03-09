# Gestió d'Esdeveniments en React

> Basat en el contingut de [luisllamas.es](https://www.luisllamas.es/react-gestion-de-eventos/) — Traduït al català

---

## Introducció

Ja tenim components. Ara necessitem que l'usuari pugui interactuar amb la interfície: fent clic en botons, escrivint en formularis o arrossegant elements.

En React, la gestió d'esdeveniments és molt similar al DOM tradicional, però amb algunes diferències sintàctiques i d'arquitectura que fan que el nostre codi sigui **més predictible** i **compatible entre navegadors**.

---

## Sintaxi: React vs HTML

Si veniu d'escriure HTML clàssic, estareu acostumats a això:

```html
<button onclick="activarLasers()">Disparar</button>
```

En React (JSX), hi ha **dues diferències fonamentals**:

| HTML clàssic | React (JSX) |
|---|---|
| `onclick` (tot minúscules) | `onClick` (camelCase) |
| String amb codi: `"funcio()"` | Referència a funció: `{funcio}` |

```tsx
// React (JSX)
function Boto() {
  const handleClick = () => {
    alert('Pew pew!');
  };

  return (
    <button onClick={handleClick}>
      Disparar
    </button>
  );
}
```

### L'error comú: Executar vs Referenciar

Fixeu-vos bé en com passem la funció a l'event:

| | Sintaxi | Resultat |
|---|---|---|
| ✅ Correcte | `onClick={handleClick}` | Passa **referència** — s'executa quan l'usuari fa clic |
| ❌ Incorrecte | `onClick={handleClick()}` | **Executa** la funció immediatament durant el renderitzat |

Si poseu els parèntesis `()`, esteu executant la funció immediatament quan React renderitza el component, **no** quan l'usuari fa clic.

---

## Esdeveniments més comuns

Encara que React suporta pràcticament tots els esdeveniments del navegador, el 90% del temps fareu servir aquests:

### `onClick`

Es fa servir per a botons, enllaços i elements interactius. Funciona igual que el clic natiu.

```tsx
<button onClick={() => setComptador(c => c + 1)}>
  Incrementar
</button>
```

### `onChange`

Es fa servir per a camps de formulari (`<input>`, `<textarea>`, `<select>`). Es dispara cada vegada que el valor canvia.

```tsx
function CampNom() {
  const [nom, setNom] = useState('');

  return (
    <input
      type="text"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      placeholder="Escriu el teu nom"
    />
  );
}
```

### Altres esdeveniments freqüents

| Esdeveniment | Descripció | Exemple d'ús |
|---|---|---|
| `onSubmit` | Quan s'envia un formulari | Processar dades d'un form |
| `onFocus` | Quan un element rep el focus | Mostrar indicacions |
| `onBlur` | Quan un element perd el focus | Validar camps |
| `onMouseEnter` | Quan el ratolí entra a un element | Tooltips, hover effects |
| `onMouseLeave` | Quan el ratolí surt d'un element | Amagar tooltips |
| `onKeyDown` | Quan es prem una tecla | Dreceres de teclat |
| `onKeyUp` | Quan es deixa anar una tecla | Búsqueda en temps real |
| `onDoubleClick` | Doble clic | Edició inline |

---

## L'objecte SyntheticEvent

Quan escrivim un handler d'events en React, rebem un argument `e`. Però **no és un event natiu del DOM** — és un **SyntheticEvent**.

React implementa el seu propi sistema d'esdeveniments. És una **capa d'abstracció** (un wrapper) que envolta l'event natiu del navegador.

### Per què fa això React?

Per garantir la **compatibilitat Cross-Browser**. Diferents navegadors (Chrome, Safari, Firefox, etc.) de vegades implementen els esdeveniments de forma lleugerament diferent. React **normalitza** tot això perquè la interfície de l'event sigui idèntica, independentment d'on s'executi la vostra web.

### Propietats i mètodes principals

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();     // Evita el comportament per defecte
  e.stopPropagation();    // Evita que l'event pugi (bubbling)

  console.log(e.target);  // L'element que va disparar l'event
  console.log(e.type);    // 'click'
};
```

| Propietat/Mètode | Descripció |
|---|---|
| `e.preventDefault()` | Evita el comportament per defecte del navegador |
| `e.stopPropagation()` | Evita la propagació (bubbling) de l'event |
| `e.target` | L'element DOM que ha disparat l'event |
| `e.currentTarget` | L'element DOM al qual està associat el handler |
| `e.type` | Tipus de l'event (`'click'`, `'change'`, etc.) |
| `e.nativeEvent` | L'event natiu del navegador (rarament necessari) |

### Tipat amb TypeScript

React proporciona tipus específics per a cada event:

```tsx
// Events de ratolí
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };

// Events de teclat
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { ... };

// Events de formulari
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... };

// Events de focus
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => { ... };
```

---

## Passant arguments als Event Handlers

Sovint, dins d'una llista, voldrem passar una dada específica al handler (per exemple, l'ID de l'element que volem esborrar).

### ❌ El que NO podem fer

```tsx
// ❌ Això executa la funció immediatament!
<button onClick={eliminar(id)}>
  Eliminar
</button>
```

### ✅ Solució: Funció fletxa (arrow function)

La forma més comuna i moderna. Creem una funció anònima que, en ser executada, crida la nostra funció amb paràmetres.

```tsx
// ✅ Correcte
<button onClick={() => eliminarUsuari(usuari.id)}>
  Eliminar
</button>
```

Aquí, el que passem a `onClick` és la **definició** de la funció fletxa. React executarà la fletxa quan passi el clic, i la fletxa al seu torn executarà `eliminarUsuari`.

### ✅ Amb accés a l'event

Si necessiteu tant l'event com un argument addicional:

```tsx
<button onClick={(e) => eliminarUsuari(e, usuari.id)}>
  Eliminar
</button>
```

---

## Prevent Default

En HTML, si teniu un formulari i un botó de submit, al fer clic **la pàgina es recarregarà**. En una **SPA** (Single Page Application) com les que fem amb React, volem evitar aquesta recàrrega.

Per fer-ho, usem `e.preventDefault()`.

```tsx
function Formulari() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 1. IMPORTANT: Evitem la recàrrega de la pàgina
    e.preventDefault();

    // 2. Processem les dades
    console.log('Enviant dades...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom" />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

> ⚠️ **Recordeu**: En React, mai retorneu `false` des d'un handler per evitar el comportament per defecte. **Sempre** useu `e.preventDefault()`.

---

## Resum de bones pràctiques

| Pràctica | Descripció |
|---|---|
| Useu **camelCase** | `onClick`, `onChange`, no `onclick`, `onchange` |
| Passeu **referències**, no crides | `onClick={fn}`, no `onClick={fn()}` |
| Tipeu els events amb **TypeScript** | `React.MouseEvent<HTMLButtonElement>` |
| Useu **preventDefault** als formularis | Evitar recàrrega de pàgina en SPAs |
| **Extraieu** handlers complexos | Noms descriptius: `handleSubmit`, `handleDeleteUser` |
| Useu **arrow functions** per passar arguments | `onClick={() => fn(id)}` |

---

## Exemples en aquest projecte

Aquesta aplicació **EventHub** demostra tots els conceptes d'esdeveniments:

| Fitxer | Concepte demostrat |
|---|---|
| `src/components/Events/EventFilters.tsx` | `onChange` en inputs, `onClick` en botons de filtre |
| `src/components/Events/EventForm.tsx` | `onSubmit` amb `preventDefault`, `onChange` en camps controlats |
| `src/components/Events/EventCard.tsx` | Navegació amb `Link` (event de clic implícit) |
| `src/pages/EventDetailPage.tsx` | `onClick` amb arguments (registre, eliminació) |
| `src/pages/EventsPage.tsx` | Handlers amb callback props (`onSearch`, `onCategoryChange`) |
| `src/components/Layout/Header.tsx` | Navegació amb `Link` i estils actius |

### Patrons clau usats a l'app

```tsx
// 1. onChange amb estat controlat (EventForm.tsx)
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// 2. onSubmit amb preventDefault (EventForm.tsx)
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  addEvent(formData);
  navigate('/events');
};

// 3. onClick amb arguments (EventDetailPage.tsx)
<button onClick={() => deleteEvent(event.id)}>
  Eliminar
</button>

// 4. Callbacks entre components (EventsPage → EventFilters)
<EventFilters
  onSearch={(query) => setSearchTerm(query)}
  onCategoryChange={(cat) => setCategory(cat)}
/>
```
