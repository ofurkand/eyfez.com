const tahta = document.getElementById("satrancTahtasi");
const verilerURL = "_kaynakca/veriler.json";
let resimDosyaTurleri = ["img","object"];
const gecerliResimDosyaTuru = resimDosyaTurleri[0];
const siraGostergesi = document.getElementById("sira");
const anaDugme = document.getElementById("oyun");
const sifirlamaDugmesi = document.getElementById("sifirla");
let oyunAktifligi = false;
let turuncuRGB ="rgb(255, 165, 0)";
let sira = true; // (renk için geçici kullanımında)true: Beyaz
let hamleSecildi = false;
const notasyon = 
["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", 
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let baslangicKonumu=["rnbqkbnr","pppppppp","8","8","8","8","PPPPPPPP","RNBQKBNR"].reverse();

function donusturFEN(girdi){
    return girdi.split('/').reverse();
}

for (let index = 1; index <= 64; index++) {
    let eklenecekKare = document.createElement('div')
    eklenecekKare.classList.add('kare');
    index%8==1?sira:sira=!sira;sira?
    eklenecekKare.classList.add('beyaz'):
    eklenecekKare.classList.add('siyah');
    eklenecekKare.id=`${notasyon[(index-1)%8]}${Math.abs(64-((index-1)-((index-1)%8)))/8}`;
    tahta.appendChild(eklenecekKare);
}

// let deneme = document.getElementById("C4");
// let eklenecek = document.createElement('img');
// eklenecek.src='_kaynakca/taslar/at.svg';
// deneme.appendChild(eklenecek);

// function tasYerlestir(baslangic,hedef){
//     baslangic = document.getElementById(baslangic);
//     hedef = document.getElementById(hedef);

//     hedef.appendChild(baslangic.getElementsByTagName("img")[0]);
// }

// function yerlestir(konum,tas){
//     if (Array.isArray(konum)){let i = 0;
//         konum.forEach(element => { i++; let j = 1;
//             // console.log(element);
//             element.split('').forEach(element2 => { 
//                 !isNaN(Number(element2)) ?
//                 j += element2: yerlestir(`${notasyon[i-1]}${j}`,element2); j++;
//                 console.log([`${notasyon[i-1]}${j-1}`,element2]);
//             });
//         });
//     }

function yerlestir(konum,tas){
    if (Array.isArray(konum)){let j = 0;
        konum.forEach(element => { let i = 0; j++;
            // console.log(element);
            element.split('').forEach(element2 => { i++;
                !isNaN(Number(element2)) ?
                i += Number(element2)-1 : yerlestir(`${notasyon[i-1]}${j}`,element2);
                // console.log(artan+=element2) : yerlestir(`${notasyon[i-1+artan]}${j}`,element2);
                // console.log([`${notasyon[i-1]}${j-1}`,element2]);
            });
        });
    }

    // if (Array.isArray(konum)){ let j = 0;
    //     konum.forEach(element => { let i = 1;
    //         // console.log(element);
    //         element.split('').forEach(element2 => {console.log(!isNaN(Number(element2)))
    //             !isNaN(Number(element2))?
    //             j += element2: yerlestir(`${notasyon[i-1]}${i}`,element2); i++;
    //             console.log([`${notasyon[i-1]}${i}`,element2]);
    //         });
    //     });
    // }

    else{
        konum = document.getElementById(konum);
        let _tas = document.createElement(gecerliResimDosyaTuru);

        // (async () => {
        //       let response = await fetch(verilerURL);
        //       let data = await response.json();
        //       console.log(data);
        //     });
        // console.log(tas===tas.upperCase)

        // if (!(tas===tas.toUpperCase())) {
        //     _tas.style="filter: invert(100%);";
        //     _tas.class="tas beyaz";
        // }else{
        //     _tas.class="tas siyah";
        // }

        // tas===tas.toUpperCase()?null:_tas.style="filter: invert(100%);";
        tas===tas.toUpperCase()?_tas.style="filter: invert(100%);":null;
        // async function x() {
            // let response = await fetch(verilerURL);
            // let data =  response.json();
        fetch(verilerURL)
        .then(response => response.json())
        .then(data => {
            _tas.src = "_kaynakca/"+data.taslar[tas.toLowerCase()].resimURL;
            _tas.alt = (tas===tas.toUpperCase()?data.taslar[tas.toLowerCase()].isim.toUpperCase():
            data.taslar[tas].isim.toLowerCase());
            // _tas.onerror = (_tas.style.visibility="hidden");
            konum.appendChild(_tas);
        });
            // console.log(tas);
            // console.log(data.taslar[tas.toLowerCase()]);
            // _tas.data  = "_kaynakca/"+data.taslar[tas.toLowerCase()].resimURL;
            // _tas.src = "_kaynakca/"+data.taslar[tas.toLowerCase()].resimURL;
            // _tas.alt = tas;
            // _tas.style.fill = tas===tas.toUpperCase()?"gray":"#a6a2a2";
            // konum.appendChild(_tas);
        // }; x();
        
    }
}

// let beyazlar = Array.from(document.querySelectorAll("img")).filter(svg => {
//     let style = window.getComputedStyle(svg);
//     return style.filter.includes('invert');
// });
// let siyahlar = Array.from(document.querySelectorAll("img")).filter(svg => {
//     let style = window.getComputedStyle(svg);
//     return !(style.filter.includes('invert'));
// });

// let i = 0
// while(i < 3){

// // Adding event listeners
// buttons.forEach(button => button.addEventListener("click", handleClick));

// // Removing event listeners later
// buttons.forEach(button => button.removeEventListener("click", handleClick));
const eventAdded_hamleSureci = new Set();
function hamleSureci(takim){
    takim.forEach(img => {
        // img.parentElement.style.cursor = "pointer";
        // img.addEventListener('mouseenter', () => {
        //     if (oyunAktifligi) {
        //         if (!hamleSecildi) {
        //             img.parentElement.style.transition= '0.3s';
        //             img.parentElement.style.backgroundColor = '#0000FF';
        //         }
        // }
        // });
        img.addEventListener('mouseenter',fareUstunde);
        // img.addEventListener('mouseleave', () => {
        //     if (oyunAktifligi) {
        //         if (!hamleSecildi) {
        //             img.parentElement.style.backgroundColor = '';
        //         }
        //     }
        // });
        img.addEventListener('mouseleave',fareAyrildi);
        // img.addEventListener('click', (yer) => { 
        //     // Hamle Kısmı
        //     if (oyunAktifligi) {
        //         if (!hamleSecildi) {
        //             let secili = yer.target;
        //             // secili.parentElement.style.backgroundColor = turuncuRGB;
        //             kontrol(secili);
        //             // console.log(Array.from(document.getElementsByClassName('kare'))
        //             // .filter(div => div.style.backgroundColor === "darkblue").length);
        //             if(Array.from(document.getElementsByClassName('kare'))
        //                 .filter(div => div.style.backgroundColor === "darkblue").length>0){
        //                 secili.parentElement.style.backgroundColor = turuncuRGB;
        //                 hamleSecildi = true;
        //             }
        //         };
        //     }
        // });
        img.addEventListener('click',hamleYapim);

        eventAdded_hamleSureci.add(img);
    });
};

// function hamleYapim(){
//     alert("deneme");
// }

// // Create a MutationObserver to watch for style changes
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         if (mutation.type === "attributes" && mutation.attributeName === "style") {
//             const target = mutation.target;
//             if (target.backgroundColor === "darkblue") {
//                 target.cursor = "pointer";
//                 target.addEventListener("click", hamleYapim);
//             } else {
//                 target.cursor = "";
//                 target.removeEventListener("click", hamleYapim);
//             }
//         }
//     });
// });

// // Observe all divs
// document.querySelectorAll("div").forEach((div) => {
//      observer.observe(div, { attributes: true, attributeFilter: ["style"] });
// });

function fareUstunde() {
    if (hamleSecildi){
        if(getComputedStyle(this).backgroundColor === 'rgb(0, 0, 139)'){
        this.style.boxShadow = "0px 0px 15px 0px rgba(0, 0, 0, 0.5)"; // Hover'da box-shadow
        this.style.cursor = 'pointer';
        }
    }
    else{
        if (oyunAktifligi) {
            // this.parentElement.style.transition= '0.3s';
            this.parentElement.style.backgroundColor = '#0000FF';
            this.style.cursor = 'pointer';
        }
    }
}

function fareAyrildi() {
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

function hamleYapim() {
    if (hamleSecildi){
        if(getComputedStyle(this).backgroundColor === 'rgb(0, 0, 139)'){
            let secili = (Array.from(document.getElementsByClassName('kare')).filter(element => {
                return getComputedStyle(element).backgroundColor === turuncuRGB;
            }))[0];
            // console.log(yer.target);
            // console.log(secili.firstChild);
            // console.log(yer.target);
            this.hasChildNodes()?
            this.replaceChild(secili.firstChild,this.firstChild):
            this.appendChild(secili.firstChild);
            hamleSecildi = false;
            this.style.boxShadow = "";
            hamleSirasi();
            // removeEventListener(fareAyrildi);
            // removeEventListener(fareUstunde);
        }
    }
    else{
        // console.log(this);
        if (this.parentElement.hasChildNodes()) {
            // secimTemizle();
            kontrol(this);
            if(Array.from(document.getElementsByClassName('kare'))
                .filter(div => div.style.backgroundColor === "darkblue").length>0){
                this.parentElement.style.backgroundColor = turuncuRGB;
                hamleSecildi = true;
            }
        }
        // let secili = yer.target;
        // secili.parentElement.style.backgroundColor = turuncuRGB;
        // console.log(Array.from(document.getElementsByClassName('kare'))
        // .filter(div => div.style.backgroundColor === "darkblue").length);
    }
}


// Define configurations for the observer
const config = { subtree: true, attributes: true, attributeFilter: ['style'] };
// Callback function to execute when mutations are observed
const eventAdded_callback = new Set();
const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.attributeName === 'style') {
            if (getComputedStyle(mutation.target).backgroundColor === 'rgb(0, 0, 139)') {
                
                // mutation.target.style.cursor = 'pointer';

                // setTimeout(() => {
                //     mutation.target.style.cursor = 'pointer';
                // }, 100);

                mutation.target.addEventListener('mouseenter', fareUstunde);

                // mutation.target.addEventListener('mouseleave', function(yer) {
                //     if (hamleSecildi && getComputedStyle(yer.target).backgroundColor === 'rgb(0, 0, 139)'){
                //     mutation.target.style.boxShadow = ""; // Hover'dan çıkınca box-shadow kaldır
                //     }
                // });
                mutation.target.addEventListener('mouseleave',fareAyrildi);

                // mutation.target.addEventListener('click', (yer) => { 
                //     if (hamleSecildi && getComputedStyle(yer.target).backgroundColor === 'rgb(0, 0, 139)') {
                //         let secili = (Array.from(document.getElementsByClassName('kare')).filter(element => {
                //             return getComputedStyle(element).backgroundColor === turuncuRGB;
                //         }))[0];
                //         // console.log(yer.target);
                //         // console.log(secili.firstChild);
                //         // console.log(yer.target);
                //         yer.target.appendChild(secili.firstChild);
                //         hamleSecildi = false;
                //         secimTemizle();
                //         // sira = !sira;
                //         yer.target.style.boxShadow = "none";
                //     }
                // });

                // setTimeout(() => {
                //     mutation.target.addEventListener('click',hamleYapim);
                // }, 500);
                mutation.target.addEventListener('click',hamleYapim);
                eventAdded_callback.add(mutation.target); // Event eklendi olarak işaretle
            }
            else { 
                // Eğer rengi değiştiyse (artık mavi değilse) event listener'ları kaldır
                if (eventAdded_callback.has(mutation.target)) {
                    mutation.target.removeEventListener('mouseenter', fareUstunde);
                    mutation.target.removeEventListener('mouseleave', fareAyrildi);
                    mutation.target.removeEventListener('click', hamleYapim);
                    
                    eventAdded_callback.delete(mutation.target); // Event kaldırıldı olarak işaretle
                    // console.log("Event listener kaldırıldı:", mutation.target);
                }
            }
        }
    }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(tahta, config);

// function event1(){
//     takimAyristir.parentElement.style.transition= '0.3s';
//     takimAyristir.parentElement.style.backgroundColor = '#0000FF';
// }
// function event2(){
//     takimAyristir.parentElement.style.backgroundColor = '';
//     console.log("OK");
// }
// function event3(){
//     if (oyunAktifligi) {
//         let secili = this.target;
//         kontrol(secili);
//     }
// }
// let takimAyristir = Array.from(document.querySelectorAll("img"))
// .filter(svg => {return (sira?window.getComputedStyle(svg).filter.includes('invert'):
// !(window.getComputedStyle(svg).filter.includes('invert')))}));
// anaDugme.addEventListener("click", () => {
//     takimAyristir.forEach(img => {
//         img.addEventListener('mouseenter', event1);
//         img.addEventListener('mouseleave', event2);
//         img.addEventListener('click', event3);
//     // hamleSureci(Array.from(document.querySelectorAll("img")).filter(svg => {
//     //     // let style = window.getComputedStyle(svg);
//     // return (sira?window.getComputedStyle(svg).filter.includes('invert'):
// !(window.getComputedStyle(svg).filter.includes('invert')))}));
//     // console.log(document.querySelectorAll('img'));
//     });
//     oyunAktifligi = true;});

anaDugme.addEventListener("click", ()=>{
    hamleSirasi(true);
    oyunAktifligi = true;
});

function takimSecici() {
    return Array.from(document.querySelectorAll("img"))
    .filter(svg => {return (sira?(window.getComputedStyle(svg).filter.includes('invert')):
    !(window.getComputedStyle(svg).filter.includes('invert')))});
}

function hamleSirasi(x = null){
    secimTemizle();
    // removeEventListener("mouseenter",fareUstunde);
    // removeEventListener("mouseleave",fareAyrildi);
    // removeEventListener("click",hamleYapim);
    eventAdded_hamleSureci.forEach(element => {
        element.removeEventListener('mouseenter', fareUstunde);
        element.removeEventListener('mouseleave', fareAyrildi);
        element.removeEventListener('click', hamleYapim);
        eventAdded_hamleSureci.delete(element);
    });
    // takimSecici().forEach(element => element.parentElement.style.transition = '');
    x === null ? sira = !sira:sira;
    takimSecici().forEach(element => element.parentElement.style.transition = '0.3s');
    // console.log(Array.from(document.querySelectorAll("img"))
    // .filter(svg=>!window.getComputedStyle(svg).filter.includes('invert')));
    // hamleSureci(Array.from(document.querySelectorAll("img"))
    // .filter(svg => {return (sira?(window.getComputedStyle(svg).filter.includes('invert')):
    //     !(window.getComputedStyle(svg).filter.includes('invert')))}));
    hamleSureci(takimSecici());
    hamleSecildi = false;

    // oyunAktifligi = true;
}

function secimTemizle(){
    // Array.from(document.getElementsByClassName('siyah')).forEach(a => a.style.backgroundColor='');
    // Array.from(document.getElementsByClassName('beyaz')).forEach(a => a.style.backgroundColor='');
    // Array.from(document.getElementsByClassName('kare')).forEach(a => a.style.cursor='default');
    Array.from(document.getElementsByClassName('kare')).forEach(a=>a.hasAttribute?a.removeAttribute("style"):null);
    
}

// console.log(document.body.innerHTML);
sifirlamaDugmesi.addEventListener("click", ()=>{
    Array.from(document.getElementsByClassName('kare')).forEach(div => {
        while (div.firstChild) {
            console.log(div);
            div.removeChild(div.firstChild);
        }
    });
    secimTemizle();
    yerlestir(baslangicKonumu);
    // Array.from(document.getElementsByClassName('siyah')).forEach(a => a.removeAttribute("style"));
    // button.removeEventListener('mouseenter',hamleSureci);
    // button.removeEventListener('mouseleave',hamleSureci);
    // button.removeEventListener('click',hamleSureci);
    // oyunAktifligi = true;
})


// hamleSureci(Array.from(document.querySelectorAll("img")).filter(svg => {
//     // let style = window.getComputedStyle(svg);
//     return (sira?window.getComputedStyle(svg).filter.includes('invert'):
// !(window.getComputedStyle(svg).filter.includes('invert')))}));

function tasAdi(konum){
    return konum.src.split('/').at(-1).split(".")[0]
}


function kontrol(secili){
    let secilen = tasAdi(secili);
    let konumArr = secili.parentElement.id.split('');
    let i = notasyon.indexOf(konumArr[0]);
    let cnt = 0;
    switch (secilen) {
        case "sah":
            // // sağa
            // if(!(konumArr[0] === "H")){
            //     if (document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
            //         }
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
            //     }
            // }
            // // sola
            // if(!(konumArr[0] === "A")){
            //     if (document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
            //         }
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
            //     }
            // }
            // // yukarı
            // if(!(Number(konumArr[1]) === 8)){
            //     if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
            //         }
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
            //     }
            // }
            // // aşağı
            // if(!(Number(konumArr[1]) === 1)){
            //     if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
            //         }
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
            //     }
            // }
            // // sol aşağı
            // if(!(Number(konumArr[1]) === 1)&&!(konumArr[0] === "A")){
            //     if (document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-1}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-1}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
            //         }
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
            //     }
            // }
            // // sol üst
            // if(!(Number(konumArr[1]) === 8)&&!(konumArr[0] === "A")){
            //     if (document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+1}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+1}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
            //         }
            //         break;
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
            //     }
            // }
            // // sağ üst
            // if(!(Number(konumArr[1]) === 8)&&!(konumArr[0] === "H")){
            //     if (document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+1}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+1}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
            //         }
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
            //     }
            // }
            // // sağ aşağı
            // if(!(Number(konumArr[1]) === 1)&&!(konumArr[0] === "H")){
            //     if (document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-1}`).hasChildNodes()) {
            //         if (!(document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-1}`).firstChild.style.filter.includes('invert')===sira)) {
            //             document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
            //         }
            //     }
            //     else{
            //         document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
            //     }
            // }
            
            // sağa
            if(!(notasyon[i] === "H")){
                if (document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                }
                i++;
            }
            i = notasyon.indexOf(konumArr[0]);
            // sola
            if(!(notasyon[i] === "A")){
                if (document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                }
                i--;
            }
            i = notasyon.indexOf(konumArr[0]);
            // yukarı
            if(!((cnt+Number(konumArr[1])) === 8)){
                if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            cnt = 0;
            i = notasyon.indexOf(konumArr[0]);
            // aşağı
            if(!(Number(konumArr[1]-cnt) === 1)){
                if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";                    
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt = 0;
            // sol aşağı
            if(!((Number(konumArr[1])-cnt === 1)||(notasyon[i-cnt] === "A"))){
                if (document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sol üst
            if(!((Number(konumArr[1])+cnt === 8)||(notasyon[i-cnt] === "A"))){
                if (document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sağ üst
            if(!((Number(konumArr[1])+cnt === 8)||(notasyon[i+cnt] === "H"))){
                if (document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sağ aşağı
            if(!((Number(konumArr[1])-cnt === 1)||(notasyon[i+cnt] === "H"))){
                if (document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            break;
        case "vezir":
            // sağa
            while(!(notasyon[i] === "H")){
                if (document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                }
                i++;
            }
            i = notasyon.indexOf(konumArr[0]);
            // sola
            while(!(notasyon[i] === "A")){
                if (document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                }
                i--;
            }
            i = notasyon.indexOf(konumArr[0]);
            // yukarı
            while(!((cnt+Number(konumArr[1])) === 8)){
                if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                        
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            cnt = 0;
            i = notasyon.indexOf(konumArr[0]);
            // aşağı
            while(!(Number(konumArr[1]-cnt) === 1)){
                if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";                    
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt = 0;
            // sol aşağı
            while(!((Number(konumArr[1])-cnt === 1)||(notasyon[i-cnt] === "A"))){
                if (document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sol üst
            while(!((Number(konumArr[1])+cnt === 8)||(notasyon[i-cnt] === "A"))){
                if (document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sağ üst
            while(!((Number(konumArr[1])+cnt === 8)||(notasyon[i+cnt] === "H"))){
                if (document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sağ aşağı
            while(!((Number(konumArr[1])-cnt === 1)||(notasyon[i+cnt] === "H"))){
                if (document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            break;
        case "fil":
            // sol aşağı
            while(!((Number(konumArr[1])-cnt === 1)||(notasyon[i-cnt] === "A"))){
                if (document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sol üst
            while(!((Number(konumArr[1])+cnt === 8)||(notasyon[i-cnt] === "A"))){
                if (document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i-1-cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sağ üst
            while(!((Number(konumArr[1])+cnt === 8)||(notasyon[i+cnt] === "H"))){
                if (document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            i = notasyon.indexOf(konumArr[0]);
            cnt=0;
            // sağ aşağı
            while(!((Number(konumArr[1])-cnt === 1)||(notasyon[i+cnt] === "H"))){
                if (document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i+1+cnt]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            break;
        case "at":
            // üst sol
            if((Number(konumArr[1]) < 7)&&!(konumArr[0] === "A")){
                if (document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+2}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+2}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+2}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])+2}`).style.backgroundColor="darkblue";
                }
            }
            // üst sağ
            if((Number(konumArr[1]) < 7)&&!(konumArr[0] === "H")){
                if (document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+2}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+2}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+2}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])+2}`).style.backgroundColor="darkblue";
                }
            }
            // alt sol
            if((Number(konumArr[1]) > 2)&&!(konumArr[0] === "A")){
                if (document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-2}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-2}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-2}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i-1]}${Number(konumArr[1])-2}`).style.backgroundColor="darkblue";
                }
            }
            // alt sağ
            if((Number(konumArr[1]) > 2)&&!(konumArr[0] === "H")){
                if (document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-2}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-2}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-2}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i+1]}${Number(konumArr[1])-2}`).style.backgroundColor="darkblue";
                }
            }
            // sağ üst
            if((Number(konumArr[1]) < 8)&&!((konumArr[0] === "H")||(konumArr[0] === "G"))){
                if (document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])+1}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])+1}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
                }
            }
            // sağ alt
            if((Number(konumArr[1]) > 1)&&!((konumArr[0] === "H")||(konumArr[0] === "G"))){
                if (document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])-1}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])-1}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i+2]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
                }
            }
            // sol üst
            if((Number(konumArr[1]) < 8)&&!((konumArr[0] === "A")||(konumArr[0] === "B"))){
                if (document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])+1}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])+1}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
                }
            }
            // sol alt
            if((Number(konumArr[1]) > 1)&&!((konumArr[0] === "A")||(konumArr[0] === "B"))){
                if (document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])-1}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])-1}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
                    }
                }
                else{
                    document.getElementById(`${notasyon[i-2]}${Number(konumArr[1])-1}`).style.backgroundColor="darkblue";
                }
            }
            break;
        case "kale":
            // sağa
            while(!(notasyon[i] === "H")){
                if (document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i+1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                }
                i++;
            }
            i = notasyon.indexOf(konumArr[0]);
            // sola
            while(!(notasyon[i] === "A")){
                if (document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i-1]}${konumArr[1]}`).style.backgroundColor="darkblue";
                }
                i--;
            }
            i = notasyon.indexOf(konumArr[0]);
            // yukarı
            while(!((cnt+Number(konumArr[1])) === 8)){
                if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                        
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i]}${Number(konumArr[1])+1+cnt}`).style.backgroundColor="darkblue";
                }
                cnt++;
            }
            cnt = 0;
            i = notasyon.indexOf(konumArr[0]);
            // aşağı
            while(!(Number(konumArr[1]-cnt) === 1)){
                if (document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).hasChildNodes()) {
                    if (!(document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";
                    }
                    break;
                }
                else{
                    document.getElementById(`${notasyon[i]}${Number(konumArr[1])-1-cnt}`).style.backgroundColor="darkblue";                    
                }
                cnt++;
            }
            break;
        case "piyon":
            // normal hareket
            if (!(document.getElementById(`${notasyon[i]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).hasChildNodes())) {
                document.getElementById(`${notasyon[i]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).style.backgroundColor="darkblue";
                // başlangıç yararı
                if (!(document.getElementById(`${notasyon[i]}${(sira?Number(konumArr[1])+2:Number(konumArr[1])-2)}`).hasChildNodes())&&(sira?Number(konumArr[1])===2:Number(konumArr[1])===7)) {
                    document.getElementById(`${notasyon[i]}${(sira?Number(konumArr[1])+2:Number(konumArr[1])-2)}`).style.backgroundColor="darkblue";
                }
            }
            // çapraz kontrol
                // sağ
                if (!(konumArr[0]==="H")) {
                    if ((document.getElementById(`${notasyon[i+1]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).hasChildNodes())&&
                    !(document.getElementById(`${notasyon[i+1]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).firstChild.style.filter.includes('invert')===sira)) {
                        document.getElementById(`${notasyon[i+1]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).style.backgroundColor="darkblue";
                    }
                }
                // sol
                if (!(konumArr[0]==="A")) {
                    if ((document.getElementById(`${notasyon[i-1]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).hasChildNodes())&&
                    !(document.getElementById(`${notasyon[i-1]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).firstChild.style.filter.includes('invert')===sira)) {
                    document.getElementById(`${notasyon[i-1]}${(sira?Number(konumArr[1])+1:Number(konumArr[1])-1)}`).style.backgroundColor="darkblue";
                    }
                }
            // if ((document.getElementById(`${(sira?notasyon[i+1]:notasyon[i-1])}${Number(konumArr[1])+1}`).hasChildNodes())&&
            // !(document.getElementById(`${(sira?notasyon[i+1]:notasyon[i-1])}${Number(konumArr[1])+1}`).firstChild.style.filter.includes('invert')===sira)) {
            //     document.getElementById(`${(sira?notasyon[i+1]:notasyon[i-1])}${Number(konumArr[1])+1}`).style.backgroundColor="darkblue";
            // }

            // en-passant şu anlık devre-dışı
            break;
        default:
            break;
    }
}

//     i++;
// }

// siyahlar.forEach(element => {
//     element.parentElement.style.backgroundColor = "red"; 
// });


// function hamleYap(hamle){
// }

// tasHareket("C4","H5");
