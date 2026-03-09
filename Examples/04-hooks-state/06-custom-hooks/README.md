# Com crear Custom Hooks a React

## Introducció

Fins ara hem estat utilitzant els Hooks que React ens dóna "de fàbrica". Per exemple, `useState` per a la memòria i `useEffect` per als efectes.

Però, què passa quan tenim una **lògica complexa que necessitem usar en diversos components a la vegada**?

A React, de la mateixa manera que extraiem la interfície repetida a Components, a vegades extraiem la **lògica repetida a Custom Hooks**.

Un Custom Hook és una funció JavaScript que utilitza altres Hooks (com `useState`, `useEffect`, etc.) per encapsular lògica reutilitzable.

La idea principal és extreure la lògica d'un component i col·locar-la en una funció separada, que després pot ser utilitzada en múltiples components.

### Quan crear un Custom Hook?

La meva recomanació és la regla de **"Repeteix dues vegades, i després refactoritza"**:

1. La primera vegada, escriviu la lògica dins del component.
2. La segona vegada que necessiteu el mateix en un altre lloc, copieu i enganxeu.
3. La tercera vegada, és el moment obligatori de refactoritzar i extreure a un Custom Hook.

---

## Què és un Custom Hook?

Un Custom Hook és, en realitat, una simple **funció de JavaScript**. És una funció que pot contenir lògica, càlculs i, el més important, pot **cridar a altres Hooks de React** en el seu interior.

Hi ha una única regla estricta: **el nom de la vostra funció HA DE començar per "use"**.

- ✅ `useCounter`
- ✅ `useForm`
- ✅ `useFetch`
- ❌ `createCounter`

Això no és només una convenció perquè les persones ho llegim millor. Els Linter de React busquen funcions que comencin per `use` per verificar que compliu les regles dels hooks.

---

## Exemple 1: Abstraient estat (`useCounter`)

Creem el nostre primer Custom Hook. Volem encapsular la lògica d'un número que puja, baixa i es reinicia.

Creem un fitxer nou, per exemple `/src/hooks/useCounter.ts`:

```tsx
import { useState } from "react";

// 1. Definim la funció amb prefix 'use'
export const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  // 2. Definim les funcions de manipulació
  const increment = (step = 1) => setCounter(c => c + step);
  const decrement = (step = 1) => setCounter(c => c - step);
  const reset = () => setCounter(initialValue);

  // 3. Retornem el que el component necessiti
  // Pot ser un array [] o un objecte {}
  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
```

### Com l'usem?

Ara, als nostres components, el codi queda molt net:

```tsx
import { useCounter } from "./hooks/useCounter";

function Carretó() {
  // Inicialitzem el hook
  const { counter, increment, decrement } = useCounter(1);

  return (
    <div>
      <h3>Productes: {counter}</h3>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => increment()}>+</button>
    </div>
  );
}
```

Si demà volem canviar la lògica (per exemple, que el comptador mai baixi de zero), només modifiquem `useCounter.ts` i tots els components s'actualitzaran.

---

## Compartir lògica vs Compartir estat

Quan usem un Custom Hook en dos components diferents, **no estan compartint l'estat**. Estan compartint la **lògica d'estat**.

```tsx
// Component A
const counterA = useCounter(); // Té el seu propi estat intern (0)

// Component B
const counterB = useCounter(); // Té el SEU PROPI estat intern (0)
```

Si incremento `counterA`, el `counterB` no se n'assabenta.

Cada crida a un Custom Hook crea una **instància totalment aïllada** dels estats (`useState`) i efectes (`useEffect`) que contingui dins.

> Si el que voleu és compartir l'estat globalment (que al modificar un canviïn els dos), necessiteu altres eines com **Context API** o gestors d'estat global (Zustand, Redux).

---

## Exemple 2: Abstraient efectes (`useFetch`)

Veiem un altre exemple més avançat. Anem a encapsular la complexitat de `useEffect`, peticions asíncrones i gestió d'errors en un hook reutilitzable.

L'objectiu és que volem poder demanar dades així de fàcil: `const { data, loading, error } = useFetch(url);`

Creem el fitxer `src/hooks/useFetch.ts`:

```tsx
import { useState, useEffect } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Resetem estats en canviar la URL
    setLoading(true);
    setData(null);
    setError(null);
    
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la petició");
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // Cleanup: Cancel·lem la petició si el component es desmunta
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};
```

### Ús en components

Fixeu-vos en la diferència al component principal. Hem passat de tenir 20 línies de lògica asíncrona a una sola línia declarativa:

```tsx
function UserList() {
  const { data, loading, error } = useFetch<User[]>("https://api.example.com/users");

  if (loading) return <p>Carregant...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

---

## Referència

Contingut basat en: https://www.luisllamas.es/react-custom-hooks/
