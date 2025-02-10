import { verilerURL } from "../script.js";

let resimDosyaTurleri = ["img","object"];
const gecerliResimDosyaTuru = resimDosyaTurleri[0];

export function yerlestir(konum,tas){
    if (Array.isArray(konum)){let j = 0;
        konum.forEach(element => { let i = 0; j++;
            element.split('').forEach(element2 => { i++;
                !isNaN(Number(element2)) ?
                i += Number(element2)-1 : yerlestir(`${notasyon[i-1]}${j}`,element2);
            });
        });
    }

    else{
        konum = document.getElementById(konum);
        let _tas = document.createElement(gecerliResimDosyaTuru);
        tas===tas.toUpperCase()?_tas.style="filter: invert(100%);":null;

        fetch(verilerURL)
        .then(response => response.json())
        .then(data => {
            _tas.src = "_kaynakca/"+data.taslar[tas.toLowerCase()].resimURL;
            _tas.alt = (tas===tas.toUpperCase()?data.taslar[tas.toLowerCase()].isim.toUpperCase():
            data.taslar[tas].isim.toLowerCase());
            konum.appendChild(_tas);
        });
    }
}