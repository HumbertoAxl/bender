async function checkCookies() {
    let check = Cookies.get('email')
    try {
        if (check.includes('@ferimport.com.br')) {
        document.getElementsByTagName("BODY")[0].style.display = "block";
        }
    } catch (e) {
        window.location.href = '../../'
    }
}

function tHide(Elemento, Timer = 1000) {
    Elemento.classList.add("transition");
    setTimeout(() => Elemento.style.display = "none", Timer)
}

function Hide (Elemento) {
    Elemento.style.display = "none"
}

function tShow(Elemento, Timer = 1000) {
    Elemento.classList.add("transition");
    setTimeout(() => Elemento.style.display = "block", Timer);
    setTimeout(() => Elemento.classList.remove("transition"), 1000);
}

function sendMessage(Titulo, Icone, Timer = 1000, Toast = 'true', Texto = '', HTML) {
    Swal.fire({
        title: Titulo,
        icon: Icone,
        toast: Toast,
        timer: Timer,
        text: Texto,
        html: HTML,
    });
}

function tratarCaracteresEspeciais (Palavras) {
    Palavras = Palavras.replace(/,/g,'VIRGULA')
    Palavras = Palavras.replace(/'VIRGULA/g,"',")
    Palavras = Palavras.replace(/'/g, 'ASPASSIMPLES')
    Palavras = Palavras.replace(/′/g, 'ASPASSIMPLES')
    Palavras = Palavras.replace(/\[ASPASSIMPLES/g, "['")
    Palavras = Palavras.replace(/ASPASSIMPLES,/g, "',")
    Palavras = Palavras.replace(/,ASPASSIMPLES/g, ",'")
    Palavras = Palavras.replace(/″/g,'"')
    Palavras = Palavras.replace(/‶/g,'"')
    Palavras = Palavras.replace(/"/g, 'ASPASDUPLAS')
    Palavras = Palavras.replace(/ASPASDUPLAS,/g, "',")
    Palavras = Palavras.replace(/\[ASPASDUPLAS/g, '["')
    return Palavras
}