export function takimSecici() {
    return Array.from(document.querySelectorAll("img"))
    .filter(svg => {return (sira?(window.getComputedStyle(svg).filter.includes('invert')):
    !(window.getComputedStyle(svg).filter.includes('invert')))});
}