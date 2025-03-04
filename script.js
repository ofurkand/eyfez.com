const kalanZamanGos = document.getElementById("saat");
const ilerGos = document.getElementById("ilerleme-gostergesi");
const ilerYaz = document.getElementById("ilerleme-yazisi");
const anaYazi = document.getElementById("ana-yazi");
const veriDosyasi = "/src/tempAPI.json";
let _veriler = JSON.parse(localStorage.getItem("veriler"));
let _baslangicGunuIndexi = localStorage.getItem("baslangicGunuIndexi");
let kaydedilenGunSayisi = 30;
// console.log(typeof _veriler);
let vakitler = [];
let birGundeBulunanMs = 1000 * 60 * 60 * 24;
// let iftarMi = false
// let simdi = (iftarMi) => iftarMi ? bugununVakitleri().aksam : bugununVakitleri().imsak;

//  // Apisiz, manuel girdiler.
// let gununIftarVakti = 
// // new Date().setHours(19,0,0,0);
// new Date(2025, 1, 28, 19, 0, 0, 0);  // Year, Month (0-indexed), Day, Hour, Minute, Second, Millisecond

// let deneme = new Date(2025, 1, 28, 19, 0, 0, 0);
// deneme.setDate(deneme.getDate() + 1);
// console.log(deneme.toS);
class vakit{
    constructor(imsakSaat,aksamSaat){
        this.gunuEkle();
        /* Bu kısım verileri yüklemeye engel oldu.
        this.imsak = imsak;
        this.aksam = aksam;
        */
        this.imsak = imsakSaat;
        this.aksam = aksamSaat;
        // this.imsak = parseFloat(imsakSaat).toFixed(2);
        // this.orucMuddet = Math.abs(
        //     // (this.imsak.toString().split(".")[0]*60+this.imsak.toString().split(".")[1])-
        //     // (this.aksam.toString().split(".")[0]*60+this.aksam.toString().split(".")[1])            
        //     (parseInt(this.imsak.split(":")[0])*60+parseInt(this.imsak.split(":")[1]))-
        //     (parseInt(this.aksam.split(":")[0])*60+parseInt(this.aksam.split(":")[1]))
        // )*60;
        // this.tarih = this.dateFormatindaGetir();
    }

    gunuEkle(){
        vakitler.push(this);
    }

    // orucMuddet(){
    //     return Math.abs(
    //         // (this.imsak.toString().split(".")[0]*60+this.imsak.toString().split(".")[1])-
    //         // (this.aksam.toString().split(".")[0]*60+this.aksam.toString().split(".")[1])            
    //         (parseInt(this.imsak.split(":")[0])*60+parseInt(this.imsak.split(":")[1]))-
    //         (parseInt(this.aksam.split(":")[0])*60+parseInt(this.aksam.split(":")[1]))
    //     )*60;
    // }

    // dateFormatindaGetir(){
        
    // }
}

// try {
// if (vakitler.length > 0) {
//     vakitler.forEach(element => {
//         new vakit(...Object.values(element));
//     });
// }else{
    // } catch (error) {

function veriIslem(){
    let bugununGunuIndexi = yilinKacinciGunu()-1;
    if ((_veriler !== null && _veriler !== undefined)/*&&window.cekilenHaftaBaslangicininGunu >= bugununGunu-6-1*/) {
        // if (_baslangicGunu !== null && _baslangicGunu !== undefined) {
        if (!(_baslangicGunuIndexi < bugununGunuIndexi + kaydedilenGunSayisi - 1)) {
            vakitler = [];
            localStorage.removeItem("veriler");
            veriIslem();
            return;
        }
        // }
        // console.log('vakitler :>> ', vakitler);
        _veriler.forEach(element => {
            new vakit(...Object.values(element));
        });
        // console.log("Var");
        sayac();
    }else {
        // console.log("Yok");
        fetch(veriDosyasi)
        .then(res => res.json())
        .then(data => {
            // data["2025"].forEach(element => {
            //     new vakit(...Object.values(element));
            // });}
            let _veri = data["2025"];
            // window.cekilenHaftaBaslangicininGunu = bugununGunu;
            _baslangicGunuIndexi = bugununGunuIndexi;
            if (vakitler.length === 0) {
                for (let index = _baslangicGunuIndexi; index < _baslangicGunuIndexi+kaydedilenGunSayisi; index++) {
                    new vakit(...Object.values(_veri[index]));
                }// Yüklemenin hızlandırılması amaçlanıyor.
            }
        })
        .then(() => {
            localStorage.setItem("veriler", JSON.stringify(vakitler));
            localStorage.setItem("baslangicGunuIndexi", _baslangicGunuIndexi);
        })
        .then(()=>{
            // _baslangicGunuIndexi = localStorage.getItem("baslangicGunuIndexi");
            sayac();
        });
        // .then(()=>{});
        // .then(x => { main();});    
    }
}
veriIslem();

// function main(){
//     setInterval(sayac(),1000);
// }

// function main(){
// }
// } finally{
// localStorage.setItem("veriler", JSON.stringify(vakitler));
// }
// const bugununVakitleri = () => vakitler[yilinKacinciGunu() - 1];
/*
if (!vakitler) {
    fetch(veriDosyasi)
    .then(res => res.json())
    .then(data => {
        // let zaman = new Date();
        // function duzenlenmisHal(girdi){ 
        //     return [
        //         [girdi.getDate().toString().length<2?`0${girdi.getDate()}`:girdi.getDate()],
        //         [girdi.getMonth().toString().length<2?`0${girdi.getMonth()+1}`:girdi.getMonth()+1],
        //         [girdi.getFullYear().toString().slice(-2)]
        //     ].join("/")
        // }
        // console.log(duzenlenmisHal(zaman));
        // // new vakit(Object.values(data[duzenlenmisHal(zaman)])[0],Object.values(data[duzenlenmisHal(zaman)])[1],Object.values(data[duzenlenmisHal(zaman)])[2]);
        // new vakit(...Object.values(data[duzenlenmisHal(zaman)])); // "..." aynı bir foreach gibi
        // // const { sahur, aksam, imsak } = data[duzenlenmisHal(zaman)]; new vakit(sahur, aksam, imsak); // Tercih edilmedi.
    
        // // Yarınki veri alınıyor
        // zaman.setDate(zaman.getDate()+1);
        // new vakit(...Object.values(data[duzenlenmisHal(zaman)]));
    
        // 2. Deneme (Taşındı)
        data["2025"].forEach(element => {
            new vakit(...Object.values(element));
        });
        localStorage.setItem("veriler", JSON.stringify(vakitler));
    });
}else{
    vakitler.forEach(element => {
        new vakit(...Object.values(element));
    });
}
*/

function ilerlemeYuzdesiniYaz(bas,son,fark, iftarMi) {
    // console.log((new Date(zaman.getFullYear(),zaman.getMonth(),zaman.getDate(),toplamSure.split(":")[0],toplamSure.split(":")[1]))/1000);
    // ilerGos.value = bugununVakitleri().or;
    // ilerYaz.textContent = `${yuzde}%`;
    
}

function yilinKacinciGunu(tarih = new Date()) {
    let yilinBasi = new Date(tarih.getFullYear(), 0, 0); // Not: ChatGPT yardımı alındı. Yıl / Ay / Gün şeklinde
    // bir yapı temel alınabiliyormuş. Bu girdi bize bir önceki senemiz olan 2024 Aralık'ının sonunu gösteriyor 
    // lakin bu; o yılın artık yıl olmasından kaynaklandığından değil, Gün için girilen argümanın 0 olmasındandır.
    let _fark = tarih - yilinBasi;
    // console.log('fark :>> ', _fark/birGundeBulunanMs);
    // console.log('yilinBasi :>> ', yilinBasi);
    // console.log('tarih :>> ', tarih);
    return parseInt(_fark/ birGundeBulunanMs) // "kaçıncı" olduğu değeri 0'dan başlamamaktadır, sebebi yukarıda.
}

// console.log(yilinKacinciGunu(new Date(2025,0,1, 0, 0)));
// console.log(yilinKacinciGunu());
// console.log(bugununVakitleri());
// let kSaat,kDakika,kSaniye;
function kalanZamaniYaz(){
    let zaman = new Date(); // Şu an
    // console.log(zaman.getDate());
    // console.log(zaman);
    // console.log(gununIftarVakti.toString());
    // let kalanZaman = parseInt((gununIftarVakti-zaman.getTime()).toString().slice(0,-3));
    // let kalanZaman = gununIftarVakti-zaman.getTime();
    // kalanZaman = parseInt(kalanZaman/1000); // salise değerleri çıkartıldı
    // let kSaat = (parseInt(kalanZaman / 60**2)).toString();
    // let kDakika = (parseInt(kalanZaman / 60 % 60).toString());
    // let kSaniye = (kalanZaman % 60).toString()
    // kSaat = parseInt(kalanZaman/3600);
    // kDakika = Math.floor(kalanZaman / (60)%60);
    // kSaniye = Math.floor(kalanZaman %60);
    // console.log(kalanZaman,kSaat,kDakika,kSaniye);
    // kalanZamanGos.textContent = 
    // // `${zaman.getHours()}:${zaman.getMinutes().toString().length < 2 ? `0${zaman.getMinutes()}`:zaman.getMinutes()}:${zaman.getSeconds().toString().length < 2 ? `0${zaman.getSeconds()}`:zaman.getSeconds()}`;
    // // `${kSaat.length<2?'0':''}${kSaat}:${kDakika.length<2?'0':''}${kDakika}:${kSaniye.length<2?'0':''}${kSaniye}`;
    // `${kSaat.padStart(2,"0")}:${kDakika.padStart(2,"0")}:${kSaniye.padStart(2,"0")}`;
    // ilerlemeYuzdesiniYaz(zaman,kalanZaman);

    // 2. Deneme
    // let suAnkiSaat = `${zaman.getHours()}:${zaman.getMinutes()}`;
    
    // let siradakiZaman = bugununVakitleri().imsak;

    // let fark = saniyeyeCevir(suAnkiSaat) - saniyeyeCevir(bugununVakitleri().aksam);
    // console.log(fark);
    // console.log(zaman);
    // switch(true){
    //     case fark > 0:
    //         // console.log("büyük");
    //         anaYazi.textContent = "İftara Ne Kadar Kaldı?";
    //         // console.log(bugununVakitleri());
    //         let _fark = bugununVakitleri().orucMuddet() - fark;
    //         siradakiZaman = bugununVakitleri(_fark >= 0 ? null : 1).aksam;
    //         if (_fark < 0){
    //             _fark = bugununVakitleri(1).orucMuddet() - fark;
    //         }
    //         fark = _fark;
    //         // console.log(siradakiZaman);
    //         break;
    //     case fark < 0:
    //         // console.log("küçük");
    //         siradakiZaman = bugununVakitleri(1).imsak;
    //         anaYazi.textContent = "Sahura Ne Kadar Kaldı?";
    //         break;
    // }

    // let gununImsaki = new Date(2025, 1, 28, 14, 30); // 28 Şubat 2025, 14:30
    // let gunun = new Date(2025, 1, 28, 16, 45); // 28 Şubat 2025, 16:45

    // if (saat1.getTime() < saat2.getTime()) {
    //     console.log("Saat1 daha önce.");
    // } else if (saat1.getTime() > saat2.getTime()) {
    //     console.log("Saat2 daha önce.");
    // } else {
    //     console.log("Saatler eşit.");
    // }

    // if(fark >= 0){ // Sahurdan sonra
    //     fark = 
    //     parseInt(
    //         (zaman - 
    //             new Date(zaman.getFullYear(),zaman.getMonth(),
    //             zaman.getDate(),bugununVakitleri().aksam.split(":")[0],bugununVakitleri().aksam.split(":")[1]))/1000);
    //     if (fark >= 0) {
    //         // İftardan sonra
    //         siradakiZaman = bugununVakitleri(1);
    //     }

    // }
    // let fark = zamanHesapla(simdi(iftarMi=false),zaman);
    let fark = zamanHesapla(bugununVakitleri().imsak,zaman);
    // let fark = zamanHesapla(siradakiZaman,zaman);
    if (fark <= 0){ // Sahurdan Önce
        // siradakiZaman = bugununVakitleri().imsak;
        anaYazi.textContent = "Sahura Ne Kadar Kaldı?";
    } else { // Sahurdan Sonra
        fark = zamanHesapla(bugununVakitleri().aksam,zaman);
        if (fark <= 0){ // İftardan Önce
            anaYazi.textContent = "İftara Ne Kadar Kaldı?";
        } else { // Gün Bitimi
            fark = zamanHesapla(bugununVakitleri(1).imsak,zaman);
            anaYazi.textContent = "Sıradaki Sahura Ne Kadar Kaldı?";
        }
    }

    ilerlemeYuzdesiniYaz(fark);
    fark < 0 ? fark = fark*-1 : fark = fark;
    kalanZamanGos.textContent = 
    `${parseInt(fark/60**2).toString().padStart(2,"0")}:${(parseInt(fark/60)%60).toString().padStart(2,"0")}:${(fark%60).toString().padStart(2,"0")}`;

    // console.log(fark);
    // console.log(siradakiZaman);
    // console.log(fark);
    // console.log(bugununVakitleri().imsak);
}


/**
 * Günün belirli bir saatine kadarki farkı gösterir.
 * @param {string} _hedefZaman - Saat formatı (Örn: "19:03"), hedef zamanı işaret eder.
 * @param {Date} _baslangicZamani - Başlangıç zamanını işaret eder (varsayılan: anlık saat).
 * @returns - Kaç saniyelik fark olduğudur.
 */
//@param {boolean} geriSayim
function zamanHesapla(_hedefZaman,_baslangicZamani = new Date()/*, geriSayim = true*/){
    // switch(geriSayim){
    //     case true:
    return parseInt(
        (_baslangicZamani - 
            new Date(_baslangicZamani.getFullYear(),_baslangicZamani.getMonth(),
            _baslangicZamani.getDate(),_hedefZaman.split(":")[0],_hedefZaman.split(":")[1]))/1000);
        // case false:
        //     return parseInt(
        //         (_baslamaZamani + 
        //             new Date(_baslamaZamani.getFullYear(),_baslamaZamani.getMonth(),
        //             _baslamaZamani.getDate(),_hedefZaman.split(":")[0],_hedefZaman.split(":")[1]))/1000);
    // }

    // eval fonksiyonunda hata bulunmakta.
    // return parseInt(
    //     eval(_zaman, 
    //         geriSayim ? "-":"+", 
    //         new Date(_zaman.getFullYear(),_zaman.getMonth(),_zaman.getDate(),_vakit.split(":")[0],_vakit.split(":")[1]))
    //     /1000)
}

// function saniyeyeCevir(saat){
//     return parseInt(saat.toString().split(":")[0])*(parseInt(saat.toString().split(":")[1])*60)
// }

// function saniyeyeCevir(saat){
//     // let _saniye = 60;
//     // let _dakika = parseInt(saat.toString().split(":")[1])*_saniye;
//     // let _saat = parseInt(saat.toString().split(":")[0])*_saniye**2;
//     return parseInt(saat.toString().split(":")[1])*60 + parseInt(saat.toString().split(":")[0])*60**2 
// }

// kalanZamaniYaz();

function bugununVakitleri(sonrakiGun = 0){
    // return vakitler[yilinKacinciGunu() - 1 + sonrakiGun]
    // console.log('vakitler :>> ', vakitler);
    return vakitler[sonrakiGun + ((yilinKacinciGunu()-1)-_baslangicGunuIndexi)]
}

function sayac(){
    console.log("Başlatıldı");
    kalanZamaniYaz();
    setInterval(kalanZamaniYaz,1000);
    // Günlük kontrol devre-dışı
    // setInterval(veriIslem(),birGundeBulunanMs);
}

// Example: Update the progress every second
// let progress = 0;
// setInterval(() => {
//   if (progress > 100) {
//     clearInterval(interval);
//   } else {
//     updateProgress(progress);
//     progress += 10;
//   }
// }, 1000);

// sayac();
// }