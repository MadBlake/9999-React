# Com utilitzar el Hook useReducer a React

## Introducció

Hem vist que `useState` és el mecanisme fonamental per a la reactivitat a React, ideal per a valors independents i senzills.

Tanmateix, quan gestionem **estats interdependents** o **transicions complexes** on una sola acció ha de mutar múltiples variables simultàniament, el codi tendeix a tornar-se difícil de mantenir.

Per a escenaris de lògica d'estat complexa, React proporciona el hook **useReducer**.

Per exemple, imagina un reproductor de música. Al donar-li a "Següent cançó" han de passar moltes coses a la vegada:

- Incrementar l'índex de la pista.
- Reiniciar el temps de reproducció a 0.
- Establir l'estat de reproducció a `true`.
- Actualitzar les metadades de la interfície.

Si fem això amb `useState`, tindrem quatre crides a `set...` disperses pel codi. Si hi ha més d'un lloc on fer play, a més, ho tindríem tot duplicat o triplicat.

### Quan usar quin?

- **`useState`**: Per a valors independents, primitius (números, booleans) o formularis simples. És el que usareu el 90% de les vegades.
- **`useReducer`**: Quan el següent estat depèn molt de l'anterior, o teniu lògica complexa (múltiples variables, objectes niuats, etc).

---

## Sintaxi de useReducer

El hook `useReducer` és una funció de React que permet gestionar l'estat d'un component utilitzant un **patró de reducer**.

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Rep dos arguments:

- **Reducer**: Una funció que pren l'estat actual i una acció, i retorna un nou estat.
- **Estat inicial**: El valor inicial de l'estat.

Per altra banda, retorna un array amb dos elements:

- **Estat actual**: El valor actual de l'estat.
- **Dispatch**: Una funció que permet enviar accions al reducer per actualitzar l'estat.

---

### Estructura d'un Reducer

Un reducer és una **funció pura** de JavaScript que:

- Rep l'estat actual i una acció
- Retorna el nou estat

```tsx
function reducer(state, action) {
  switch (action.type) {
    case 'ACCIO_1':
      // Retorna un nou estat basat en ACCIO_1
      return nouEstat;
    case 'ACCIO_2':
      // Retorna un nou estat basat en ACCIO_2
      return nouEstat;
    default:
      // Retorna l'estat actual si l'acció no és reconeguda
      return state;
  }
}
```

Per convenció, les **Accions** són objectes amb dues propietats:

```tsx
// Acció estàndard
{
  type: 'ACTUALITZAR_EMAIL',
  payload: 'nou@email.com'
}
```

- `type`: Un string en majúscules que descriu què ha passat (`INCREMENT`, `DELETE_USER`, `FETCH_START`).
- `payload` (opcional): Les dades necessàries per realitzar l'acció (l'ID a esborrar, l'objecte usuari a guardar, etc).

---

## Exemple

Vegem un exemple pràctic amb una llista de tasques:

```tsx
import { useReducer } from 'react';

// La funció reducer
function tascaReducer(state, action) {
  switch (action.type) {
    case 'AFEGIR':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'ESBORRAR':
      return state.filter(tasca => tasca.id !== action.payload);
    case 'NETEJAR':
      return [];
    default:
      return state;
  }
}
```

---

## Per què és millor que useState?

A primera vista sembla molt més codi per fer el mateix. I és cert: per a un comptador simple, `useReducer` és matar mosques a canonades.

### Desacoblament

La lògica de com s'actualitza l'estat està **fora del component**. Podríeu moure la funció `tascaReducer` a un altre fitxer i testejar-la de forma aïllada sense renderitzar React.

### Intenció clara

Al llegir `dispatch({ type: 'LOGIN_SUCCESS' })`, enteneu exactament què ha passat a l'aplicació. Al llegir `setIsAuthenticated(true); setUser(data); setLoading(false);`, heu de desxifrar què significa aquest conjunt de canvis.

### Depuració

Si l'estat és incorrecte, sabeu que l'error està al `reducer`. Amb `useState`, l'error podria estar a qualsevol de les 20 funcions que criden a `setState`.

---

## Referència

Contingut basat en: https://www.luisllamas.es/react-hook-usereducer/
