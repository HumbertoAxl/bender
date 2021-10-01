async function checkCookies() {
    let check = Cookies.get('email')
    let url = window.location.href
    try {
        if (check.includes('@ferimport.com.br')) {
            document.getElementsByTagName("BODY")[0].style.display = "block";
            switch (true) {
                case url.includes('Menu'): await logBender('Menu')
                break
                case url.includes('EmailSAC'): await logBender('EmailSAC')
                break
                case url.includes('InserirMarca'): await logBender('InserirMarca')
                break
                case url.includes('TestarHTML'): await logBender('TestarHTML')
                break
                case url.includes('Drive'): await logBender('Drive')
                break
                case url.includes('OutrasFuncoes'): await logBender('OutrasFuncoes')
                break
                default: console.log('erro')
            }
            if (window.location.href.includes('Menu/menu')) {
                if (!Cookies.get('seenUpdate0.8')) {
                    sendMessage('Atualização 0.8 ✅', 'info', null, false, '', '<b>NOVO: </b> Tabela com informações dos produtos colocados em "Gerar Link"<br><b>NOVO: </b>Agora você poderá ver o que atualizou no Bender a cada versão!<br>Melhorias e bugfixes<br><b>Oferecimento:</b> Bananas do seu Didico 🍌', 'Nice!')
                    Cookies.set('seenUpdate0.8', true, { expires: 365 })
                }
            }
        } else {
            window.location.href = '../../'
        }
    } catch (e) {
        window.location.href = '../../'
    }
}

function tHide(Elemento, Timer = 1000) {
    Elemento.classList.add("transition");
    setTimeout(() => Elemento.style.display = "none", Timer)
}

function Hide(Elemento) {
    Elemento.style.display = "none"
}

function tShow(Elemento, Timer = 1000) {
    Elemento.classList.add("transition");
    setTimeout(() => Elemento.style.display = "block", Timer);
    setTimeout(() => Elemento.classList.remove("transition"), 1000);
}

function sendMessage(Titulo, Icone, Timer = 1000, Toast = 'true', Texto = '', HTML, ConfirmButton = 'OK') {
    Swal.fire({
        title: Titulo,
        icon: Icone,
        toast: Toast,
        timer: Timer,
        text: Texto,
        html: HTML,
        confirmButtonText: ConfirmButton
    });
}

function tratarCaracteresEspeciais(Palavras) {
    Palavras = Palavras.replace(/,/g, 'VIRGULA')
    Palavras = Palavras.replace(/'VIRGULA/g, "',")
    Palavras = Palavras.replace(/'/g, 'ASPASSIMPLES')
    Palavras = Palavras.replace(/′/g, 'ASPASSIMPLES')
    Palavras = Palavras.replace(/\[ASPASSIMPLES/g, "['")
    Palavras = Palavras.replace(/ASPASSIMPLES,/g, "',")
    Palavras = Palavras.replace(/,ASPASSIMPLES/g, ",'")
    Palavras = Palavras.replace(/″/g, '"')
    Palavras = Palavras.replace(/‶/g, '"')
    Palavras = Palavras.replace(/"/g, 'ASPASDUPLAS')
    Palavras = Palavras.replace(/ASPASDUPLAS,/g, "',")
    Palavras = Palavras.replace(/\[ASPASDUPLAS/g, '["')
    return Palavras
}

async function logBender(pagina) {
    const response = await fetch('../../log/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: Cookies.get('email'),
            data: `${pegarDia()}/${pegarMes()}/${pegarAno()}`,
            horario: `${pegarHora()}:${pegarMinutos()}`,
            caminho: pagina,
            tabela: 'Entradas'
        })
    });
    if (!response.ok) {
        console.log('Erro')
    }
}