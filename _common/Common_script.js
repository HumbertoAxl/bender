async function checkCookies() {
    Cookies.remove('seenUpdate0.8')
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
                case url.includes('LinkCarrinho'): await logBender('LinkCarrinho')
                    break
                case url.includes('OutrasFuncoes'): await logBender('OutrasFuncoes')
                    break
                case url.includes('Kits'): await logBender('Kits')
                    break
                default: alert('Página não rastreada')
            }
            if (url.includes('Menu/menu')) {
                let dataUpdate = new Date('2021-11-11T13:32:00');
                let dataUltimoAcesso = new Date(Cookies.get('UltimoAcesso'))
                if (dataUltimoAcesso == 'Invalid Date') { dataUltimoAcesso = new Date('2021-01-01T00:00:00') }
                if (dataUltimoAcesso < dataUpdate) {
                    sendMessage('Atualização 0.91.1 ✅', 'info', null, false, '', '<b>NOVO: </b>Agora é possível visualizar os kits pelo meio do ID!<br><br><i>Atualização 0.91.0</i> ⬇️<br><br><b>NOVO: </b> Kits VTEX - Insira produtos nos Kits de maneira fácil, rápida e eficiente!<br><b>Em breve: </b>Visualização de produtos nos kits<br><b>Remoção: </b>Email SAC não está mais dentro dos planos do Bender, contudo estamos conversando com parceiros para a realização do mesmo.<br><br><b>Oferecimento: Monkey Dev 🐒 e associados.</b><br><br><span style="font-size:10">Em caso de uso não permitido da marca © Monkey Corporation e de seus associados, será cobrada a multa de 300.000* bananas por dia, até a resolução do conflito.<br>* Valores podem alterar conforme imposto em justiça e a qualidade da safra.</span>', 'Nice!')
                }
                else {
                    console.log('Updated')
                }
            }
            Cookies.set('UltimoAcesso', `${pegarAno()}-${pegarMes()}-${pegarDia()}T${pegarHora()}:${pegarMinutos()}:${pegarSegundos()}`)
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
    let version = 'prod'
    if (version === 'prod') {
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
}