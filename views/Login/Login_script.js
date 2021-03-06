let xhr = new XMLHttpRequest()
async function Login() {
    let email = document.querySelector('#email').value
    let senha = document.querySelector('#senhaAcesso').value
    if (email == "" || senha == "") {
        sendMessage('Preencha todos os campos!', 'error', 1500, true)
    } else {
        sendMessage('Logando...', 'info', null, true)
        xhr.send(await sendToServer(email, senha, "../../auth/"))
        xhr.onreadystatechange = async function () {
            if (xhr.readyState === 4) {
                console.log(xhr.response)
                switch (xhr.response) {
                    case 'OK':
                        sendMessage('Login efetuado com sucesso!', 'success', 1150, true)
                        if (document.querySelector('#keepLoggedIn').checked) {
                        Cookies.set('email', email, {expires: 365})
                        } else {
                        Cookies.set('email', email)
                        }
                        Cookies.set('notFirstTime', true, { expires: 365 })
                        setTimeout(() => window.location.href = './views/Menu/menu.html', 1200);
                        break
                    case '535':
                        sendMessage('Email ou senha incorretos!', 'error', 1500, true)
                        break
                    case 'Externo':
                        sendMessage('Seu email não é Ferimport!', 'error', 1500, true)
                        break
                }
            }
        }
    }
}

async function sendToServer(email, senha, url) {
    xhr.open("POST", url)
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
