export function tasAdi(konum){
    return konum.src.split('/').at(-1).split(".")[0]
}