async function enviarDados() {
    let nomeCliente = document.querySelector('input#nomeCliente').value
    let emailCliente = document.querySelector('input#emailCliente').value
    let numeroPedido = document.querySelector('input#numeroPedido').value
    let SKU = document.querySelector('input#SKU').value
    let formaPagamento = document.querySelector('select#formaPagamento').value
    let tipoSolicitacao = document.querySelector('select#tipoSolicitacao').value
    let motivo = document.querySelector('select#motivo').value
    let headerMotivo = document.querySelector('#motivo option:checked').parentElement.label
    let responsavelEnvio = document.querySelector('select#devolução').value
    let notaFiscal = document.querySelector('input#notaFiscal').value
    let valorPedido = document.querySelector('input#valorPedido').value
    let dataPedido = document.querySelector('input#dataPedido').value
    dataPedido = dataPedido.split('-')
    dataPedido = dataPedido.reverse()
    dataPedido = dataPedido.join().replace(/,/g, '/')
    let detalhes = document.querySelector('div.infoBox:nth-of-type(1) textarea').value
    let observacoes = document.querySelector('div.infoBox:nth-of-type(2) textarea').value
    let nomeAtendente
    let emailAtendente = document.querySelector('select#emailAtendente').value
    switch (emailAtendente) {
        case 'bender.ferimport@gmail.com': nomeAtendente = 'Bender'
            break
        case 'rafaela.franca@ferimport.com.br': nomeAtendente = 'Rafaela França'
            break
        case 'jucivaldo_batista@ferimport.com.br': nomeAtendente = 'Jucivaldo Filho'
            break
        case 'iury.rodrigues@ferimport.com.br': nomeAtendente = 'Iury Rodrigues'
            break
    }
    let senhaAtendente = document.querySelector('input#senhaAtendente').value
    await enviarEmail(nomeCliente, emailCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, motivo, headerMotivo, responsavelEnvio, notaFiscal, valorPedido, dataPedido, detalhes, observacoes, nomeAtendente, emailAtendente, senhaAtendente)
}

async function enviarEmail(nomeCliente, emailCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, motivo, headerMotivo, responsavelEnvio, notaFiscal, valorPedido, dataPedido, detalhes, observacoes, nomeAtendente, emailAtendente, senhaAtendente) {
    let pathEmail = tipoSolicitacao[0] + headerMotivo[0] + responsavelEnvio[0]
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "../../email/")
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")
    let data = `{
        "nomeCliente": "${nomeCliente}",
        "emailCliente": "${emailCliente}",
        "numeroPedido": "${numeroPedido}",
        "tipoSolicitacao": "${tipoSolicitacao}",
        "pathEmail": "${pathEmail}",
        "dataPedido": "${dataPedido}",
        "nomeAtendente": "${nomeAtendente}",
        "emailAtendente": "${emailAtendente}",
        "senhaAtendente": "${senhaAtendente}"
    }`
    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4) {
            if (xhr.response == 'OK') {
                sendMessage('Email enviado com sucesso!', 'success', null, true)
                await sendtoGS(nomeCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, motivo, responsavelEnvio, notaFiscal, valorPedido, dataPedido, detalhes, observacoes, nomeAtendente)
            } else {
                sendMessage('Senha incorreta!', 'error', null, true)
            }
        }
    }
    xhr.send(data)
    sendMessage('Enviando o email...', 'info', null, true)
}

async function sendtoGS(nomeCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, motivo, responsavelEnvio, notaFiscal, valorPedido, dataPedido, detalhes, observacoes, nomeAtendente) {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "../../googlesheets/")
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Content-Type", "application/json")
    let data = `{
        "responsavel": "${nomeAtendente}",
        "solicitacao": "${tipoSolicitacao}",
        "motivo": "${motivo}",
        "responsavelEnvio": "${responsavelEnvio}",
        "pedido": "${numeroPedido}",
        "status": "Pendente",
        "nomeCliente": "${nomeCliente}",
        "dataPedido": "${dataPedido}",
        "valorPedido": "${valorPedido}",
        "dataSolicitacao": "${pegarDia()}/${pegarMes()}/${pegarAno()}",
        "detalhes": "${detalhes}",
        "SKU": "${SKU}",
        "formaPagamento": "${formaPagamento}",
        "notaFiscal": "${notaFiscal}",
        "observacoes": "${observacoes}"
    }`
    xhr.send(data)
}

// async function clientOption() {
//     if (document.querySelector('#motivo option:checked').parentElement.label == 'Cliente' && document.querySelector('#devolução > option:nth-child(4)') == null) {
//         document.querySelector('#devolução').insertAdjacentHTML('beforeend', '<option value="Cliente">Cliente</option>')
//     } else if (document.querySelector('#motivo option:checked').parentElement.label == 'Ferimport') {
//         try {
//             document.querySelector('#devolução > option:nth-child(4)').remove()
//             document.querySelector('#devolução').selectedIndex = 0
//         } catch (e) { }
//     }
// }