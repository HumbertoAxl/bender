let data = new Date();
function pegarHora() {
    let horas = data.getHours()
    if (horas <= 9) {
        horas = ('0' + horas.toString())
    }
    return horas
}

function pegarMinutos() {
    let minutos = data.getMinutes()
    if (minutos <= 9) {
        minutos = ('0' + minutos.toString())
    }
    return minutos
}

function pegarDia() {
    let dia = data.getDate()
    if (dia <= 9) {
        dia = ('0' + dia.toString())
    }
    return dia
}
function pegarMes() {
    let mes = (parseFloat(data.getMonth()) + 1)
    if (mes <= 9) {
        mes = ('0' + mes.toString())
    }
    return mes
}

function pegarAno() {
    let ano = data.getFullYear()
    return ano
}

function pegarSegundos() {
    let segundos = data.getSeconds()
    return segundos
}