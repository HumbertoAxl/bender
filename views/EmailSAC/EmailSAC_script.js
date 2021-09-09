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
    let nomeAtendente
    let emailAtendente = document.querySelector('select#emailAtendente').value
    switch(emailAtendente) {
        case 'bender.ferimport@gmail.com': nomeAtendente = 'Bender'
        case 'rafaela.franca@ferimport.com.br': nomeAtendente = 'Rafaela'
        case 'jucivaldo_batista@ferimport.com.br': nomeAtendente = 'Jucivaldo'
        case 'iury.rodrigues@ferimport.com.br': nomeAtendente = 'Iury'
    }
    let senhaAtendente = document.querySelector('input#senhaAtendente').value
    await enviarEmail(nomeCliente, emailCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, notaFiscal, valorPedido, dataPedido, motivo, observacoes, nomeAtendente, emailAtendente, senhaAtendente)
}

async function enviarEmail(nomeCliente, emailCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, notaFiscal, valorPedido, dataPedido, motivo, observacoes, nomeAtendente, emailAtendente, senhaAtendente) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://bender-ferimport.herokuapp.com/email/");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = `{
        "nomeCliente": "${nomeCliente}",
        "emailCliente": "${emailCliente}",
        "numeroPedido": "${numeroPedido}",
        "tipoSolicitacao": "${tipoSolicitacao}",
        "dataPedido": "${dataPedido}",
        "nomeAtendente": "${nomeAtendente}",
        "emailAtendente": "${emailAtendente}",
        "senhaAtendente": "${senhaAtendente}"
    }`;
    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4) {
            if (xhr.response == 'OK') {
                sendMessage('Email enviado com sucesso!', 'success', null, true)
                await sendtoGS(nomeCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, notaFiscal, valorPedido, dataPedido, motivo, observacoes, nomeAtendente)
            } else {
                sendMessage('Senha incorreta!', 'error', null, true)
            }
        }
    }
    xhr.send(data);
    sendMessage('Enviando o email...', 'info', null, true)
}

async function sendtoGS (nomeCliente, numeroPedido, SKU, formaPagamento, tipoSolicitacao, notaFiscal, valorPedido, dataPedido, motivo, observacoes, nomeAtendente) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://bender-ferimport.herokuapp.com/googlesheets/");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = `{
        "responsavel": "${nomeAtendente}",
        "solicitacao": "${tipoSolicitacao}",
        "pedido": "${numeroPedido}",
        "status": "Pendente",
        "nomeCliente": "${nomeCliente}",
        "dataPedido": "${dataPedido}",
        "valorPedido": "${valorPedido}",
        "dataSolicitacao": "${pegarDia()}/${pegarMes()}/${pegarAno()}",
        "motivo": "${motivo}",
        "SKU": "${SKU}",
        "formaPagamento": "${formaPagamento}",
        "notaFiscal": "${notaFiscal}",
        "observacoes": "${observacoes}"
    }`;
    xhr.send(data);
}