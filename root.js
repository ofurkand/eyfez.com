const siraGostergesi = document.getElementById("sira");
const baslamaDugmesi = document.getElementById("oyun");
const sifirlamaDugmesi = document.getElementById("sifirla");

let _oyunAktifligi = false;
let _sira = true;
let _siyahKisaRok = true;
let _siyahUzunRok = true;
let _beyazUzunRok = true;
let _beyazKisaRok = true;
// let _tahtaYonu = true;

Object.defineProperty(window, 'sira', {
    get() {
        baslamaDugmesi.disabled = oyunAktifligi;
        return _sira;
    },
    set(value) {
        _sira = value;
        if (oyunAktifligi) {
            siraGostergesi.textContent = `Sıra ${_sira?'beyazda':'siyahta'}!`;
        }
    }
});

Object.defineProperty(window, 'oyunAktifligi', {
    get() {
        return _oyunAktifligi;
    },
    set(value) {
        _oyunAktifligi = value;
    }
})

window.notasyon = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", 
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];