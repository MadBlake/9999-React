# Memoització a React (useMemo, useCallback, React.memo)

## Introducció

React és ràpid. Per defecte, està dissenyat perquè no us hàgiu de preocupar pel rendiment en el 90% dels casos.

Tanmateix, quan les aplicacions creixen, comencem a notar cert "lag" en escriure en un input o en obrir un menú. Generalment, això es deu a un dels problemes més habituals de React: els **renderitzats innecessaris**.

Un renderitzat innecessari és quan un component es dibuixa (a ell i als seus fills), sense realment ser necessari perquè no havia canviat res.

Un dels mecanismes per millorar això és la **Memoització**, una tècnica que permet "recordar" resultats anteriors per no haver de tornar a calcular-los.

---

## El problema del renderitzat en cascada

Per entendre la solució, primer cal entendre el problema. A React, **quan un component pare es renderitza (perquè va canviar el seu estat), tots els seus fills es renderitzen també recursivament**, hagin canviat les seves props o no.

Imagineu això:

1. Teniu un component `Pare` amb un estat `descripció`.
2. Teniu un component `Fill` que és una llista de 5.000 elements estàtica.
3. Cada cop que incrementeu la descripció del pare, React torna a pintar la llista de 5.000 elements, encara que aquesta no canviï en absolut 😱.

Això és ineficient. Aquí és on entren les nostres tres eines d'optimització.

---

## Protegint components amb `React.memo`

`React.memo` és un Higher-Order Component (HOC) que envolta el vostre component. La seva funció és verificar les props:

> Si les props que rep són idèntiques a les de la vegada anterior, no re-renderitza, reutilitza el resultat anterior.

```tsx
import { memo, useState } from 'react';

// Component Fill (Pesat)
// En envolver-lo en memo, el protegim.
const FillPesat = memo(function Fill({ text }: { text: string }) {
  console.log("Renderitzant Fill..."); // Només sortirà si 'text' canvia
  return <p>{text}</p>;
});

export default function Pare() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      
      {/* Encara que Pare canviï, 'text' segueix sent "Hola", 
          així que FillPesat NO es renderitzarà de nou. */}
      <FillPesat text="Hola" />
    </div>
  );
}
```

> ⚠️ `React.memo` fa una comparació superficial (`Object.is`). Si passeu objectes o funcions com a props, necessitareu les eines que veurem a continuació, o la memoització fallarà.

---

## Cacheant càlculs amb `useMemo`

A vegades el problema no és renderitzar el component, sinó una **lògica matemàtica pesada** que hi ha dins d'ell.

`useMemo` guarda el resultat d'una funció i **només el recalcula si les seves dependències canvien**.

Imagineu que heu de filtrar una llista de 10.000 usuaris. Si el component es renderitza perquè heu canviat el color de fons, no voleu tornar a filtrar la llista.

```tsx
import { useMemo, useState } from 'react';

interface Usuari {
  id: number;
  name: string;
}

function LlistaFiltrada({ usuaris, cerca }: { usuaris: Usuari[]; cerca: string }) {
  // ❌ MAL: Això s'executa a CADA render, alentint l'app
  // const filtrats = usuaris.filter(u => u.name.includes(cerca));

  // ✅ BÉ: Només filtrem si canvia 'usuaris' o 'cerca'
  const filtrats = useMemo(() => {
    console.log("Filtrant llista gegant...");
    return usuaris.filter(u => u.name.includes(cerca));
  }, [usuaris, cerca]);

  return (
    <ul>
      {filtrats.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

### Quan usar-lo?

Només per a **càlculs cars** (filtres grans, ordenacions complexes, transformacions de dades).

❌ No l'useu per sumes simples o strings.

---

## Estabilitzant funcions amb `useCallback`

Aquest és el Hook més difícil d'entendre, perquè té a veure amb la **Identitat Referencial** de JavaScript.

En JS, `function() {} !== function() {}`.

Cada cop que un component es renderitza, totes les funcions que hi ha dins es creen de nou. Són funcions noves en adreces de memòria noves.

Vegem el problema. Tornem a `React.memo`. Hem dit que només evita el renderitzat si les props no canvien.

```tsx
function Pare() {
  const [count, setCount] = useState(0);

  // Aquesta funció ES CREA DE NOU a cada clic
  const handleClick = () => console.log('Click');

  return (
    // React.memo NO funcionarà!
    <FillMemoitzat onClick={handleClick} />
  );
}
```

Per al Fill, la prop `onClick` ha canviat (és una funció nova), així que es renderitza igualment.

Per evitar-ho, **`useCallback` congela la funció**. Retorna exactament la mateixa instància de la funció entre renderitzats, tret que canviïn les seves dependències.

```tsx
import { useCallback } from 'react';

function Pare() {
  const [count, setCount] = useState(0);

  // ✅ Ara 'handleClick' és estable. És sempre la mateixa referència en memòria.
  const handleClick = useCallback(() => {
    console.log('Click');
  }, []); // Dependències buides = mai canvia

  return (
    // 😄 Ara sí: FillMemoitzat rep la mateixa prop i NO es renderitza.
    <FillMemoitzat onClick={handleClick} />
  );
}
```

Només necessiteu `useCallback` si aneu a passar aquesta funció com a prop a un component envoltat en `React.memo` o si la funció és dependència d'un `useEffect`.

En la resta de casos, no aporta res.

---

## El cost de la memoització

Si aquestes eines són tan bones, per què no embolcallar tot en `memo` i `useCallback`? Perquè la memoització **no és gratuïta**.

- **Consumeix Memòria**: React ha de guardar en memòria els inputs anteriors i el resultat anterior.
- **Cost de CPU**: A cada render, React ha de comparar les props noves amb les velles.

Si el component és simple (ex: un `<Button>Text</Button>`), costa més treball comparar les props que renderitzar el botó de nou.

### Quan optimitzar?

| ✅ Casos on SÍ | ❌ Casos on NO |
|---|---|
| Components visualment grans (Llistes, Taules, Gràfics) | Botons simples, Icones, Textos |
| Components que es renderitzen molt sovint (scroll, escriptura) | Components que sempre canvien (si les props canvien sempre, memo treballa per no res) |
| Quan noteu lentitud real | "Per si de cas" o optimització prematura |

---

## Referència

Contingut basat en: https://www.luisllamas.es/react-memoizacion-rendimiento/
