let xhr = new XMLHttpRequest()
async function goTo(url) {
    alert('Clicado: '+url)
    xhr.send(await sendToServer(email, url)
    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4) {
            console.log(xhr.response)
            switch (xhr.response) {
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