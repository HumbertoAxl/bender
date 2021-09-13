async function Login() {
    let Email = document.querySelector('#email').value
    let Senha = document.querySelector('#senhaAcesso').value
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "../../auth/")
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")
    let data = `{
        "email": "${Email}",
        "senha": "${Senha}",
        "data": "${pegarDia()}/${pegarMes()}/${pegarAno()}",
        "horario": "${pegarHora()}:${pegarMinutos()}"
    }`
    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4) {
            if (xhr.response == 'OK') {
                sendMessage('Login efetuado com sucesso!', 'success', 1000, true)
                setTimeout(() => window.location.href = '../../index.html', 1000);
                xhr.open("POST", "../../auth/googlesheets")
                xhr.setRequestHeader("Accept", "application/json")
                xhr.setRequestHeader("Content-Type", "application/json")
                let data = `{
                    "email": "${Email}",
                    "senha": "${Senha}",
                    "data": "${pegarDia()}/${pegarMes()}/${pegarAno()}",
                    "horario": "${pegarHora()}:${pegarMinutos()}"
                }`
                xhr.send(data)
            } else {
                sendMessage('Email ou senha incorretos!', 'error', null, true)
                xhr.open("POST", "../../auth/googlesheets")
                xhr.setRequestHeader("Accept", "application/json")
                xhr.setRequestHeader("Content-Type", "application/json")
                let data = `{
                    "email": "${Email}",
                    "senha": "${Senha}",
                    "data": "${pegarDia()}/${pegarMes()}/${pegarAno()}",
                    "horario": "${pegarHora()}:${pegarMinutos()}"
                }`
                xhr.send(data)
            }
        }
    }
    sendMessage('Logando...', 'info', null, true)
    xhr.send(data)
}