const app = Vue.createApp({
    methods: {
        pegarNome() {
            let nome = Cookies.get('email')
            nome = nome.split('@')
            nome = nome[0]
            if (nome.includes('.') || nome.includes('_')) {
                (nome.includes('.')) ? nome = nome.split('.') : nome = nome.split('_')
                nome = nome[0]
                nome = nome.charAt(0).toUpperCase() + nome.slice(1);
                return nome
            } else {
                if (nome[0].length <= 15) {
                    return nome[0]
                } else {
                    return 'usuário(a)'
                }
            }
        }
    }
})

app.mount('#menuHeader')

let xhr = new XMLHttpRequest()
async function goTo(url) {
    // alert('Clicado: ' + url)
    xhr.send(await sendToServer(email, url))
    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4) {
            console.log(xhr.response)
            switch (xhr.response) {
            }
        }
    }
}

async function sendToServer(email, senha, url) {
    xhr.open("POST", './bender/auth' + url)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")
    let data = `{
        "email": "${email}",
        "senha": "${senha}",
        "data": "${pegarDia()}/${pegarMes()}/${pegarAno()}",
        "horario": "${pegarHora()}:${pegarMinutos()}"
    }`
    return data
}