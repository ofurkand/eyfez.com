import {hamleSecildi} from "./hamle.js";

export function fareUstunde() {
    if (hamleSecildi){
        if(getComputedStyle(this).backgroundColor === 'rgb(0, 0, 139)'){
        this.style.boxShadow = "0px 0px 15px 0px rgba(0, 0, 0, 0.5)"; // Hover'da box-shadow
        this.style.cursor = 'pointer';
        }
    }
    else{
        if (oyunAktifligi) {
            this.parentElement.style.transition= '0.3s';
            this.parentElement.style.backgroundColor = '#0000FF';
            this.style.cursor = 'pointer';
        }
    }
}

export function fareAyrildi() {
    if (hamleSecildi){
        if(getComputedStyle(this).backgroundColor === 'rgb(0, 0, 139)'){
            this.style.boxShadow = ""; 
        }
    }
    else{
        this.parentElement.style.backgroundColor = '';
    }
    this.style.cursor = "";
}