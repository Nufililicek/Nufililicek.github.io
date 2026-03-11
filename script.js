// proměnné
let otazky = [];
let aktualni = 0;

// načtení textového souboru
fetch("figury_tropy.txt")
  .then(r => r.text())
  .then(data => {
    // rozdělíme podle řádků
    let radky = data.split("\n");

    // každý řádek rozdělíme podle "|"
    otazky = radky.map(r => {
      let casti = r.split("|");
      return {question: casti[0], answer: casti[1]};
    });

    zobraz();
  });

// zobrazení otázky
function zobraz() {
  if (aktualni < otazky.length) {
    document.getElementById("otazka").innerText =
      otazky[aktualni].question;
  } else {
    document.getElementById("otazka").innerText =
      "Kvíz skončil!";
    document.getElementById("odpoved").style.display = "none";
  }
}

// kontrola odpovědi
function zkontroluj() {
  let odpoved = document.getElementById("odpoved").value;

  if (odpoved == otazky[aktualni].answer) {
    document.getElementById("vysledek").innerText = "Správně";
  } else {
    document.getElementById("vysledek").innerText = "Špatně";
  }

  aktualni++;
  document.getElementById("odpoved").value = "";
  zobraz();
}
