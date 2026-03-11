let otazky = [];
let aktualni = 0;
let body = 0;

// funkce na odstranění diakritiky
function odstranDiakritiku(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// načtení textového souboru
fetch("figury_tropy.txt")
  .then(r => r.text())
  .then(data => {
    let radky = data.split("\n");
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
    document.getElementById("odpoved").value = "";
    document.getElementById("vysledek").innerText = "";
  } else {
    document.getElementById("otazka").innerText = "Kvíz skončil!";
    document.getElementById("odpoved").style.display = "none";
    document.getElementById("vysledek").style.display = "none";
    document.getElementById("skore").innerText =
      "Správných odpovědí: " + body + " z " + otazky.length;
  }
}

// kontrola odpovědi
function zkontroluj() {
  let odpoved = document.getElementById("odpoved").value;

  let odpovedCista = odstranDiakritiku(odpoved.toLowerCase());
  let spravnaCista = odstranDiakritiku(otazky[aktualni].answer.toLowerCase());

  if (odpovedCista == spravnaCista) {
    document.getElementById("vysledek").innerText = "Správně";
    body++;
  } else {
    document.getElementById("vysledek").innerText = "Špatně, správně: " + otazky[aktualni].answer;
  }

  aktualni++;
  zobraz();
}
