import { secimTemizle } from "./secimTemizle.js";
import { takimSecici } from "./takimSecici.js";
import { eventAdded_hamleSureci, turuncuRGB} from "../script.js";
import { fareAyrildi, fareUstunde } from "./fare.js";
import { kontrol } from "./kontrol.js";
import { tasAdi } from "./tasAdi.js";

export let hamleSecildi;hamleSecildi = false;

export function hamleSirasi(x = null){
    secimTemizle();
    eventAdded_hamleSureci.forEach(element => {
        element.removeEventListener('mouseenter', fareUstunde);
        element.removeEventListener('mouseleave', fareAyrildi);
        element.removeEventListener('click', hamleYapim);
        eventAdded_hamleSureci.delete(element);
    });
    x === null ? sira = !sira:sira;
    takimSecici().forEach(element => element.parentElement.style.transition = '0.3s');
    hamleSureci(takimSecici());
    hamleSecildi = false;
}

// hamle sonrası rok bozucu
function rokSifirla(){
    if (sira) {
        _beyazKisaRok = false; // şah kanadı
        _beyazUzunRok = false; // vezir kanadı
    }
    else{
        _siyahKisaRok = false;
        _siyahUzunRok = false;
    }
}

export function hamleYapim() {
    if (hamleSecildi){
        if(getComputedStyle(this).backgroundColor === 'rgb(0, 0, 139)'){
            let secili = (Array.from(document.getElementsByClassName('kare')).filter(element => {
                return getComputedStyle(element).backgroundColor === turuncuRGB;
            }))[0];
            if (tasAdi(secili.firstChild) === "sah") {
                if(Math.abs(notasyon.indexOf(this.id.split('')[0])-notasyon.indexOf(secili.id.split('')[0]))>1){
                    rokSifirla();
                    Math.abs(notasyon.indexOf(this.id.split('')[0])-8)<Math.abs(notasyon.indexOf(this.id.split('')[0])-1) ?
                        document.getElementById(`${notasyon[notasyon.indexOf(this.id.split('')[0])-1]}${this.id.split('')[1]}`)
                        .appendChild(document.getElementById(sira?"H1":"H8").firstChild):
                        document.getElementById(`${notasyon[notasyon.indexOf(this.id.split('')[0])+1]}${this.id.split('')[1]}`)
                        .appendChild(document.getElementById(sira?"A1":"A8").firstChild);
                }
            }
            if (tasAdi(secili.firstChild) === "kale") {
                if(secili.id.split('')[0] === "A" && (sira?_beyazUzunRok:_siyahUzunRok)){
                    sira?_beyazUzunRok=false:_siyahUzunRok=false;
                }
                else if(secili.id.split('')[0] === "H" && (sira?_beyazKisaRok:_siyahKisaRok)){
                    sira?_beyazKisaRok=false:_siyahKisaRok=false;
                }
            }
            this.hasChildNodes()?
            this.replaceChild(secili.firstChild,this.firstChild):
            this.appendChild(secili.firstChild);
            hamleSecildi = false;
            this.style.boxShadow = "";
            hamleSirasi();
        }
        // if (getComputedStyle(this).backgroundColor === turuncuRGB){
            hamleSecildi = false;
            secimTemizle();
        // }
    }
    else{
        if (this.parentElement.hasChildNodes()) {
            kontrol(this);
            if(Array.from(document.getElementsByClassName('kare'))
                .filter(div => div.style.backgroundColor === "darkblue").length>0){
                this.parentElement.style.backgroundColor = turuncuRGB;
                hamleSecildi = true;
            }
        }
    }
}

function hamleSureci(takim){
    takim.forEach(img => {
        img.addEventListener('mouseenter',fareUstunde);
        img.addEventListener('mouseleave',fareAyrildi);
        img.addEventListener('click',hamleYapim);
        eventAdded_hamleSureci.add(img);
    });
};