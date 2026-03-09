# Com utilitzar el Hook useEffect a React

## Introducció

Fins ara, els nostres components han estat funcions pures: reben dades, renderitzen UI i responen a events de l'usuari.

Però les aplicacions reals necessiten fer coses fora del seu món de component. Necessiten demanar dades a un servidor, subscriure's a events del teclat, manipular el DOM directament o posar temporitzadors.

En la programació funcional, a aquestes operacions que ocorren "fora" del càlcul del resultat de la funció se les anomenen **Side Effects** (efectes secundaris).

Per poder integrar aquest tipus d'accions dins de la filosofia declarativa de React, tenim el Hook **useEffect**.

---

## Què és useEffect?

`useEffect` és un Hook que ens permet executar codi **després que React hagi renderitzat** el component i actualitzat el DOM.

Penseu-hi com el lloc on diem:

> React, un cop hagis acabat de pintar la pantalla, fes això altre.

La sintaxi bàsica de `useEffect` accepta dos arguments:

```tsx
import { useEffect } from 'react';

useEffect(() => {
  // Codi de l'efecte (peticions API, subscripcions...)
}, [/* dependències */]);
```

- Una **funció d'efecte** (el codi a executar).
- Un **array de dependències** (opcional, però molt important).

---

## L'Array de dependències

El punt més interessant (i la majoria dels bugs) de `useEffect` resideix en el seu segon argument. Depenent de què li passem a l'array, l'efecte es comportarà de forma diferent.

### Sense array de dependències

Si ometem el segon argument per complet, l'efecte s'executarà després de **CADA** renderitzat.

```tsx
useEffect(() => {
  console.log("M'executo sempre que el component es pinti");
});
```

> ⚠️ Compte amb això. Si dins d'aquest efecte modifiqueu l'estat (`useState`), provocareu un renderitzat nou, que dispararà l'efecte de nou, que canviarà l'estat… creant un **bucle infinit** que penjarà el navegador.

### Array buit `[]`

Si passem un array buit, l'efecte s'executarà **només una vegada**, quan el component es munta per primera vegada.

```tsx
useEffect(() => {
  console.log("Només m'executo al muntar-se el component");
}, []);
```

Això és equivalent al `componentDidMount` de les classes antigues.

### Amb dependències específiques

Si posem variables dins de l'array, l'efecte s'executarà **quan alguna d'elles canviï**.

```tsx
useEffect(() => {
  console.log(`El valor de 'id' ha canviat a: ${id}`);
}, [id]);
```

React compara el valor actual de cada dependència amb el valor anterior (usant `Object.is`). Si són iguals, no s'executa l'efecte.

---

## La funció de neteja

A vegades, els efectes creen "brutícia" persistent. Per exemple, si creem un `setInterval` o ens subscrivim a un event global amb `addEventListener`, aquests processos seguiran vius encara que el component desaparegui de la pantalla, provocant **fuites de memòria**.

Per evitar-ho, `useEffect` ens permet retornar una **funció de neteja**.

React executarà aquesta funció en dos moments:

- **Abans d'executar l'efecte de nou**
- **Quan el component es desmunta**

```tsx
useEffect(() => {
  // 1. Setup
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // 2. Cleanup (return function)
  return () => {
    console.log("Netejant l'event...");
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

---

## Race conditions

Un dels problemes més comuns al fer peticions de dades (Data Fetching) dins d'un `useEffect` són les **Condicions de Carrera**.

Imagineu aquest escenari:

1. L'usuari selecciona el "Id 1", l'efecte demana dades *(tarda 3 segons a arribar)*.
2. L'usuari canvia ràpid al "Id 2", l'efecte demana les dades (tarden 0.5 segons a arribar).
3. Arriben les dades del Id 2 i es mostren.
4. Arriben les dades del Id 1 (perquè era més lent) i **sobreescriuen** les del 2.

L'usuari està veient que ha seleccionat el 2, però veu la informació del 1.

Per solucionar-ho, usem un patró amb una variable booleana `ignore` dins de l'efecte:

```tsx
useEffect(() => {
  let ignore = false; // Flag de control

  async function fetchDades() {
    const json = await obtenirDades(id);
    // Només actualitzem si aquest efecte segueix sent el "vàlid"
    if (!ignore) {
      setData(json);
    }
  }

  fetchDades();

  // Si el component es desmunta o l'id canvia abans d'acabar,
  // posem ignore a true.
  return () => {
    ignore = true;
  };
}, [id]);
```

Amb això, quan el "Id 1" acabi de carregar, la seva funció de neteja ja s'haurà executat (perquè hem canviat al Id 2), `ignore` serà `true`, i l'actualització d'estat s'ignorarà.

---

## Quan NO usar useEffect

### No l'useu per transformar dades

Si teniu `firstName` i `lastName` i voleu `fullName`, no useu un efecte. Calculeu-ho directament al cos del component.

```tsx
// ❌ Malament
const [nom, setNom] = useState('Pere');
const [cognom, setCognom] = useState('Garcia');
const [complet, setComplet] = useState('');

useEffect(() => {
  setComplet(nom + ' ' + cognom);
}, [nom, cognom]);

// ✅ Bé (Estat derivat)
const complet = nom + ' ' + cognom;
```

### No l'useu per gestionar events d'usuari

Si voleu enviar un formulari al fer clic, feu-ho al `onClick` o `onSubmit`, no en un efecte que escolti quan canvia l'estat. La lògica ha d'estar on ocorre l'acció.

---

## Referència

Contingut basat en: https://www.luisllamas.es/react-hook-useeffect/
