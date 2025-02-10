import { yerlestir } from './lib/yerlestir.js';
import { hamleSirasi,hamleYapim} from './lib/hamle.js';
import { secimTemizle } from './lib/secimTemizle.js';
import { fareAyrildi,fareUstunde } from './lib/fare.js';

export const tahta = document.getElementById("satrancTahtasi");
export const verilerURL = "_kaynakca/veriler.json";
export const turuncuRGB ="rgb(255, 165, 0)";

let baslangicKonumu=["rnbqkbnr","pppppppp","8","8","8","8","PPPPPPPP","RNBQKBNR"].reverse();

for (let index = 1; index <= 64; index++) {
    let eklenecekKare = document.createElement('div')
    eklenecekKare.classList.add('kare');
    index%8==1?sira:sira=!sira;sira?
    eklenecekKare.classList.add('beyaz'):
    eklenecekKare.classList.add('siyah');
    eklenecekKare.id=`${notasyon[(index-1)%8]}${Math.abs(64-((index-1)-((index-1)%8)))/8}`;
    tahta.appendChild(eklenecekKare);
}


export const eventAdded_hamleSureci = new Set();
export const eventAdded_callback = new Set();
const config = { subtree: true, attributes: true, attributeFilter: ['style'] };

const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.attributeName === 'style') {
            if (getComputedStyle(mutation.target).backgroundColor === 'rgb(0, 0, 139)' ||
            getComputedStyle(mutation.target).backgroundColor === turuncuRGB) {
                mutation.target.addEventListener('mouseenter', fareUstunde);
                mutation.target.addEventListener('mouseleave',fareAyrildi);
                mutation.target.addEventListener('click',hamleYapim);

                eventAdded_callback.add(mutation.target);
            }
            else { 
                if (eventAdded_callback.has(mutation.target)) {
                    mutation.target.removeEventListener('mouseenter', fareUstunde);
                    mutation.target.removeEventListener('mouseleave', fareAyrildi);
                    mutation.target.removeEventListener('click', hamleYapim);
                    
                    eventAdded_callback.delete(mutation.target);
                }
                }
            }
        }
    }

const observer = new MutationObserver(callback);
observer.observe(tahta, config);

baslamaDugmesi.addEventListener("click", ()=>{
    oyunAktifligi = true;
    sira=true;
    hamleSirasi(true);
    function rokAyarlari(){
        _siyahKisaRok = true;
        _siyahUzunRok = true;
        _beyazUzunRok = true;
        _beyazKisaRok = true;
    }
    rokAyarlari();
});

sifirlamaDugmesi.addEventListener("click", ()=>{
    // Array.from(document.getElementsByClassName('kare')).forEach(div => {
    //     while (div.firstChild) {
    //         console.log(div);
    //         div.removeChild(div.firstChild);
    //     }
    // });
    oyunAktifligi = false;
    tahta.innerHTML="";
    sira = true;
    siraGostergesi.textContent = "";
    for (let index = 1; index <= 64; index++) {
        let eklenecekKare = document.createElement('div')
        eklenecekKare.classList.add('kare');
        index%8==1?sira:sira=!sira;sira?
        eklenecekKare.classList.add('beyaz'):
        eklenecekKare.classList.add('siyah');
        eklenecekKare.id=`${notasyon[(index-1)%8]}${Math.abs(64-((index-1)-((index-1)%8)))/8}`;
        tahta.appendChild(eklenecekKare);
    }
    secimTemizle();
    siraGostergesi.textContent = "";
    yerlestir(baslangicKonumu);
})

