export function secimTemizle(){
    Array.from(document.getElementsByClassName('kare')).
    forEach(a=>a.hasAttribute?a.removeAttribute("style"):null);
}