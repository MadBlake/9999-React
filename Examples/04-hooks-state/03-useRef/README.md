# Com utilitzar el Hook useRef a React

## Introducció

Hem dit que a React, el flux de dades és declaratiu. Tu canvies l'estat i la interfície s'actualitza automàticament.

Tanmateix, segueixen existint situacions on necessitem sortir-nos d'aquest flux, per interactuar imperativament amb el navegador o mantenir persistència sense disparar renderitzats.

Aquí és on utilitzem **useRef**.

Bàsicament és l'eina d'"escapament" que ens dóna React per gestionar el que sense React faríem amb variables, sense afectar el cicle de renderitzat habitual.

---

## Què és useRef?

Tècnicament una referència (`ref`) és un **contenidor mutable** el valor del qual persisteix durant tot el cicle de vida del component. La sintaxi bàsica és:

```tsx
const ref = useRef(valorInicial);
```

- `valorInicial`: Valor inicial de la referència (pot ser `null`, un número, un objecte, etc.).
- `ref.current`: Propietat que emmagatzema el valor actual i pot modificar-se directament.

La clau és que aquest objecte `{ current: ... }` és la **mateixa instància de memòria** durant tota la vida del component. React garanteix que et retornarà sempre el mateix objecte, passi el que passi.

---

## Quan usar useRef

Aquest Hook té dos propòsits fonamentals que cobreixen les limitacions del `useState`:

1. **Accés al DOM**: Permet obtenir una referència directa a un node HTML per executar mètodes natius.
2. **Persistència sense rerender**: Permet emmagatzemar valors que sobreviuen als re-renderitzats però que, en canviar, no provoquen una nova actualització visual.

---

### Ús 1: Accés al DOM Real

React és declaratiu. Quan volem un `<input>`, generalment no volem tocar-lo. Només vinculem el seu valor a un `state`. Però a vegades necessitem tocar l'element del DOM.

El cas més típic és gestionar el **focus**. Imagina que vols que, al carregar la pàgina o prémer un botó, el cursor es col·loqui automàticament dins d'un input.

No existeix una prop `focus={true}` a HTML que puguem activar/desactivar fàcilment. Així que necessitem cridar al mètode natiu `.focus()` de l'element DOM.

Aquí és on podem usar `useRef`:

1. Creem la referència amb valor inicial `null`.
2. La connectem al JSX usant l'atribut especial `ref`.
3. Accedim a ella usant `.current` quan la necessitem.

```tsx
import { useRef } from 'react';

export default function FormulariFocus() {
  // 1. Crear la ref
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    // 3. Accedir a l'element DOM real
    // inputRef.current és l'element <input> del navegador
    inputRef.current?.focus();

    // Podem fer qualsevol cosa nativa:
    // inputRef.current?.scrollIntoView();
    // inputRef.current.style.backgroundColor = 'red'; (Encara que no hauríem d'abusar d'això)
  };

  return (
    <div>
      {/* 2. Connectar la ref a l'element */}
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>
        Fer Focus
      </button>
    </div>
  );
}
```

> ⚠️ No manipuleu el DOM amb refs per coses que podríeu fer amb props o estat (com canviar textos o classes CSS). Useu refs només per les "coses rares" que requereixen que usem mètodes imperatius (focus, reproducció de media, mesurar posicions).

---

### Ús 2: Variables mutables (Persistència sense render)

A vegades necessitem guardar un valor, però no volem que en canviar-lo es renderitzi el component. Vegem quines opcions tenim:

| | `let` | `useState` | `useRef` |
|---|---|---|---|
| Persisteix entre renders? | ❌ No | ✅ Sí | ✅ Sí |
| Té memòria? | ❌ No | ✅ Sí | ✅ Sí |
| Provoca re-render en canviar? | ❌ No | ✅ Sí | ❌ No |

L'exemple clàssic és un **cronòmetre**. Necessitem guardar l'ID del `setInterval` per poder aturar-lo (`clearInterval`) després. Però l'ID de l'interval és un "número intern". A l'usuari no li importa si l'ID és 123 o 456. No necessitem repintar la pantalla només perquè aquest ID hagi canviat.

```tsx
import { useState, useRef } from 'react';

export default function Cronometre() {
  const [segons, setSegons] = useState(0);
  
  // Usem una ref per guardar l'ID de l'interval
  const intervalRef = useRef<number | null>(null);

  const iniciar = () => {
    // Evitem crear múltiples intervals
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setSegons(s => s + 1);
    }, 1000);
  };

  const aturar = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div>
      <h1>Temps: {segons}s</h1>
      <button onClick={iniciar}>Start</button>
      <button onClick={aturar}>Stop</button>
    </div>
  );
}
```

En aquest exemple, `intervalRef.current` actua com una variable d'instància d'una classe antiga. Persisteix, està allà, podem llegir-la i escriure-la, però React la ignora a efectes de dibuixat.

### Quan usar quin?

Per saber si necessiteu `useState` o `useRef`, feu-vos aquesta pregunta: **"Si canvio aquesta dada, ha de canviar el que es veu a la pantalla?"**

- **SÍ** ➡ Usa `useState`.
- **NO** ➡ Usa `useRef`.

---

## Errors comuns

Hi ha un error molt greu que heu d'evitar: **Llegir o escriure refs durant el renderitzat**.

React assumeix que el cos del vostre component (la funció) ha de ser pur i no tenir efectes secundaris. Modificar una ref és un efecte secundari.

```tsx
function Component() {
  const comptador = useRef(0);
  
  // ❌ ERROR! Modificant ref durant el render
  comptador.current = comptador.current + 1;

  return <h1>{comptador.current}</h1>; // ❌ ERROR! Llegint ref al JSX
}
```

Les refs s'han de llegir i escriure dins de **handlers d'events** o dins de **useEffect**, mai al cos principal del component.

---

## Referència

Contingut basat en: https://www.luisllamas.es/react-hook-useref/
