const kalanZamanGos = document.getElementById("saat");
const ilerGos = document.getElementById("ilerleme-gostergesi");
const ilerYaz = document.getElementById("ilerleme-yazisi");
const anaYazi = document.getElementById("ana-yazi");
const veriDosyasi = "/src/tempAPI.json";
let _veriler = JSON.parse(localStorage.getItem("veriler"));
// console.log(typeof _veriler);
let vakitler = [];

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
        /** Bu kısım verileri yüklemeye engel oldu.
        this.imsak = imsak;
        this.aksam = aksam;
        */
        this.imsak = imsakSaat;
        this.aksam = aksamSaat;
        // this.imsak = parseFloat(imsakSaat).toFixed(2);
        this.orucMuddet = Math.abs(
            // (this.imsak.toString().split(".")[0]*60+this.imsak.toString().split(".")[1])-
            // (this.aksam.toString().split(".")[0]*60+this.aksam.toString().split(".")[1])            
            (this.imsak.split(":")[0]*60+this.imsak.split(":")[1])-
            (this.aksam.split(":")[0]*60+this.aksam.split(":")[1])
        );
    }

    gunuEkle(){
        vakitler.push(this);
    }
}

// try {
// if (vakitler.length > 0) {
//     vakitler.forEach(element => {
//         new vakit(...Object.values(element));
//     });
// }else{
    // } catch (error) {

if (_veriler !== null && _veriler !== undefined) {
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
        data["2025"].forEach(element => {
            new vakit(...Object.values(element));
        });}
    )
    .then(() => {
        localStorage.setItem("veriler", JSON.stringify(vakitler));
        sayac(); 
    });
    // .then(()=>{});
    // .then(x => { main();});    
}
// function main(){
//     setInterval(sayac(),1000);
// }

// function main(){
// }
// } finally{
// localStorage.setItem("veriler", JSON.stringify(vakitler));
// }
// const bugununVakitleri = () => vakitler[yilinKacinciGunu() - 1];
/**
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

function ilerlemeYuzdesiniYaz(toplamSure,farki) {
    // console.log((new Date(zaman.getFullYear(),zaman.getMonth(),zaman.getDate(),toplamSure.split(":")[0],toplamSure.split(":")[1]))/1000);
    // ilerGos.value = bugununVakitleri().or;
    // ilerYaz.textContent = `${yuzde}%`;
}

function yilinKacinciGunu(tarih = new Date()) {
    const yilinBasi = new Date(tarih.getFullYear(), 0, 0); // Not: ChatGPT yardımı alındı. Yıl / Ay / Gün şeklinde
    // bir yapı temel alınabiliyormuş. Bu girdi bize bir önceki senemiz olan 2024 Aralık'ının sonunu gösteriyor 
    // lakin bu; o yılın artık yıl olmasından kaynaklandığından değil, Gün için girilen argümanın 0 olmasındandır.
    const fark = tarih - yilinBasi;
    const birGundeBulunanMs = 1000 * 60 * 60 * 24;
    return parseInt(fark / birGundeBulunanMs)
}

// console.log(yilinKacinciGunu(new Date(2025,0,1, 0, 0)));
// console.log(yilinKacinciGunu());

// let kSaat,kDakika,kSaniye;
function kalanZamaniYaz(){
    let zaman = new Date();
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
    let fark = 
    parseInt((zaman - new Date(zaman.getFullYear(),zaman.getMonth(),zaman.getDate(),bugununVakitleri().imsak.split(":")[0],bugununVakitleri().imsak.split(":")[1]))/1000);
    let siradakiZaman;
    // let fark = saniyeyeCevir(suAnkiSaat) - saniyeyeCevir(bugununVakitleri().aksam);
    console.log(fark);
    switch(true){
        case fark > 0:
            // console.log("büyük");
            siradakiZaman = bugununVakitleri(1).aksam;
            anaYazi.textContent = "İftara Ne Kadar Kaldı?";
            break;
        case fark < 0:
            // console.log("küçük");
            siradakiZaman = bugununVakitleri().imsak;
            anaYazi.textContent = "Sahura Ne Kadar Kaldı?";
            break;
    }
    fark < 0 ? fark = fark*-1 : fark = fark;
    kalanZamanGos.textContent = 
    `${parseInt(fark/60**2).toString().padStart(2,"0")}:${(parseInt(fark/60)%60).toString().padStart(2,"0")}:${(fark%60).toString().padStart(2,"0")}`;
    ilerlemeYuzdesiniYaz(siradakiZaman,fark,zaman);
    // console.log(fark);
    // console.log(siradakiZaman);
    // console.log(fark);
    // console.log(bugununVakitleri().imsak);
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
    return vakitler[yilinKacinciGunu() - 1 + sonrakiGun]
}

function sayac(){
    console.log("Başlatıldı");
    kalanZamaniYaz();
    setInterval(kalanZamaniYaz,1000);
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