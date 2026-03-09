# Com utilitzar el Hook useState a React

## Introducció

Els components que hem fet fins ara han estat simples presentadors. Reben dades (Props) i les pinten. Si el pare canvia les props, el component s'actualitza.

Però, què passa si el canvi neix dins del component? Què passa si vull escriure en un input, desplegar un menú o incrementar un comptador al fer clic?

Aquí és on entra el concepte d'**Estat intern del component**.

L'estat és la memòria interna del component. Són les dades que pertanyen al component, que canvien amb el temps i que, quan canvien, obliguen la interfície a redibuixar-se.

Per gestionar això en components funcionals, utilitzem el nostre primer Hook: **useState**.

> Els Hooks són funcions especials que permeten al teu component funcional (efímer) "enganxar-se" a funcionalitats de React (persistents, com l'estat o el cicle de vida).

Per convenció, tots els Hooks comencen amb el prefix `use` (ex: useState, useEffect, useContext).

---

## El problema de les variables locals

Per entendre per què necessitem `useState`, primer anem a "equivocar-nos" intentant-ho "a la vella usança", amb variables normals de JavaScript.

```tsx
export default function ComptadorTrencat() {
  let compte = 0; // Variable local

  const incrementar = () => {
    compte = compte + 1;
    console.log(compte); // A la consola veurem 1, 2, 3...
  };

  return (
    <div>
      <h1>{compte}</h1>
      <button onClick={incrementar}>+1</button>
    </div>
  );
}
```

Si executeu això, veureu que:

- ✔️ El `console.log` mostra que la variable puja
- ❌ Però el número a la pantalla (el `<h1>`) es queda clavat en 0

**PER QUÈ FALLA?** Per dues raons fonamentals de l'arquitectura de React:

- **Falta de Reactivitat**: React no té forma de saber que `compte` ha canviat. Modificar una variable local no avisa React perquè dispari un re-renderitzat.
- **Abast de la variable**: Fins i tot si forçarem el renderitzat, al tornar-se a executar la funció `ComptadorTrencat()`, la línia `let compte = 0` s'executaria de nou, reiniciant tot.

---

## La solució: `useState`

Per solucionar ambdós problemes, tenim el Hook `useState`. És una funció que ens proporciona una variable que:

- **Persisteix entre renderitzats** (React s'encarrega de "recordar-la")
- **Dispara una actualització de la interfície** quan es modifica

Per usar-lo, primer l'importem de `react`:

```tsx
import { useState } from 'react';
```

I l'utilitzem així:

```tsx
const [estat, setEstat] = useState(valorInicial);
```

El que passa aquí és **Destructuring d'Arrays**. La funció `useState` retorna sempre un array amb exactament dos elements:

- El **valor actual** de l'estat (inicialment `valorInicial`).
- Una **funció setter** per actualitzar aquest valor.

### El comptador que sí funciona

```tsx
import { useState } from 'react';

export default function Comptador() {
  // Declarem una variable d'estat anomenada "compte"
  const [compte, setCompte] = useState(0);

  const incrementar = () => {
    // Usem el setter, NO modifiquem la variable directament
    setCompte(compte + 1);
  };

  return (
    <div>
      <h1>{compte}</h1>
      <button onClick={incrementar}>+1</button>
    </div>
  );
}
```

Ara, al cridar `setCompte(1)`:

1. React actualitza la seva memòria interna: "compte ara val 1".
2. React detecta el canvi i torna a executar (re-renderitza) la funció `Comptador`.
3. En aquesta nova execució, `useState(0)` ja no retorna 0, sinó 1 (el valor recordat).
4. El JSX usa aquest valor, i retorna el HTML `<h1>1</h1>`.
5. React actualitza el DOM.

---

## Regles d'ús

- **Mai modifiqueu l'estat directament**: `compte = 5` no farà res. Heu d'usar `setCompte(5)`.
- **Els Hooks només al nivell superior**: Mai crideu `useState` dins de bucles, condicions (`if`) o funcions niuades. React depèn de l'ordre de crida dels hooks per saber quin estat correspon a quina variable.

### Quan usar estat?

No tot necessita estar a l'estat. Pregunteu-vos:

- Aquesta dada es passa per props des del pare? ➡ No és estat.
- Es manté igual amb el temps? ➡ No és estat.
- Es pot calcular a partir d'altres estats o props? ➡ No és estat (és una variable derivada).

Només useu `useState` per a dades que canvien amb el temps i que necessiteu recordar entre renderitzats per pintar la interfície.

---

## Actualitzacions funcionals

Les actualitzacions d'estat a React poden ser asíncrones. Si intenteu actualitzar l'estat basant-vos en el valor anterior, fer això pot ser perillós en escenaris ràpids:

```tsx
// Si polsem molt ràpid o dins de bucles
setCompte(compte + 1);
setCompte(compte + 1);
setCompte(compte + 1);
```

És possible que, degut al closure de JavaScript, a les tres línies `compte` valgui el mateix (ex: 0), i el resultat final sigui 1 en comptes de 3.

Per evitar això, quan el nou estat depèn de l'anterior, hem de passar una **funció callback** al setter:

```tsx
// Forma correcta i segura (Functional Update)
setCompte((valorAnterior) => valorAnterior + 1);
```

Aquí React ens garanteix que `valorAnterior` és el valor més recent i real que té en memòria, just abans d'aplicar el canvi.

---

## Estat amb Objectes

El hook `useState` no barreja (merge) automàticament objectes. És a dir, si teniu un objecte complex:

```tsx
const [usuari, setUsuari] = useState({
  nom: 'Pere',
  edat: 30,
  email: 'pere@email.com'
});
```

I voleu canviar només l'email, heu de copiar manualment la resta de propietats, o les perdreu.

```tsx
// ❌ MAL: Això esborra nom i edat
setUsuari({ email: 'nou@email.com' });

// ✅ BÉ: Usem el Spread Operator per copiar l'anterior
setUsuari({ 
  ...usuari, // Copia nom i edat
  email: 'nou@email.com' // Sobreescriu email
});
```

Si l'estat té moltes propietats no relacionades, sol ser millor dividir-les en múltiples `useState` independents (`const [nom, setNom]`, `const [edat, setEdat]`) en lloc de tenir un objecte gegant.

---

## Referència

Contingut basat en: https://www.luisllamas.es/react-hook-usestate/
