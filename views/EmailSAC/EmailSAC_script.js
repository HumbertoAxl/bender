async function enviarDados () {
    let nomeCliente = document.querySelector('input#nomeCliente').value;
    let emailCliente = document.querySelector('input#emailCliente').value;
    let numeroPedido = document.querySelector('input#numeroPedido').value;
    let SKU = document.querySelector('input#SKU').value;
    let formaPagamento = document.querySelector('select#formaPagamento').value
    let tipoSolicitacao = document.querySelector('select#tipoSolicitacao').value
    let notaFiscal = document.querySelector('input#notaFiscal').value
    let valorPedido = document.querySelector('input#valorPedido').value
    let dataPedido = document.querySelector('input#dataPedido').value
    dataPedido = dataPedido.split('-')
    dataPedido = dataPedido.reverse()
    dataPedido = dataPedido.join().replace(/,/g, '/')
    let motivo = document.querySelector('div.infoBox:nth-of-type(1) textarea').value
    let observacoes = document.querySelector('div.infoBox:nth-of-type(2) textarea').value
    let emailAtendente = document.querySelector('select#emailAtendente').value
    let senhaAtendente = document.querySelector('input#senhaAtendente').value
    await enviarEmail(nomeCliente, emailCliente, numeroPedido, tipoSolicitacao, dataPedido, emailAtendente, senhaAtendente)
    return nomeCliente, emailCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, notaFiscal, valorPedido, dataPedido, emailAtendente, senhaAtendente
}

async function enviarEmail(nomeCliente, emailCliente, numeroPedido, tipoSolicitacao, dataPedido, emailAtendente, senhaAtendente) {
    let url = "http://localhost:5005/email/";
    let xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = `{
        "nomeCliente": "${nomeCliente}",
        "emailCliente": "${emailCliente}",
        "numeroPedido": "${numeroPedido}",
        "tipoSolicitacao": "${tipoSolicitacao}",
        "dataPedido": "${dataPedido}",
        "emailAtendente": "${emailAtendente}",
        "senhaAtendente": "${senhaAtendente}"
    }`;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.response == 'OK') {
                sendMessage('Email enviado com sucesso!', 'success', null, true)
            } else {
                sendMessage('Senha incorreta!', 'error', null, true)
            }
        }
    }
    xhr.send(data);
    sendMessage('Enviando o email...', 'info', null, true)
}