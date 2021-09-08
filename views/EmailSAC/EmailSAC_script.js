async function Enviar() {
    let nomeCliente = document.querySelector('input#nomeCliente').value;
    let emailCliente = document.querySelector('input#emailCliente').value;
    let numeroPedido = document.querySelector('input#numeroPedido').value;
    let formaPagamento = document.querySelector('select#formaPagamento').value
    let tipoSolicitacao = document.querySelector('select#tipoSolicitacao').value
    let notaFiscal = document.querySelector('input#notaFiscal').value
    let valorPedido = document.querySelector('input#valorPedido').value
    let dataPedido = document.querySelector('input#dataPedido').value
    dataPedido = dataPedido.split('-')
    dataPedido = dataPedido.reverse()
    dataPedido = dataPedido.join().replace(/,/g, '/')
    // let motivo = document.querySelector('div.info-box:nth-of-type(1) textarea').value
    // let observacoes = document.querySelector('div.info-box:nth-of-type(2) textarea').value
    let emailAtendente = document.querySelector('input#emailAtendente').value
    let senhaAtendente = document.querySelector('input#senhaAtendente').value
    let url = "http://localhost:5005/teste/";
    let xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = `{
        "emailCliente": "${emailCliente}",
        "nomeCliente": "${nomeCliente}",
        "numeroPedido": "${numeroPedido}",
        "formaPagamento": "${formaPagamento}",
        "tipoSolicitacao": "${tipoSolicitacao}",
        "notaFiscal": "${notaFiscal}",
        "valorPedido": "${valorPedido}",
        "dataPedido": "${dataPedido}",
        "emailAtendente": "${emailAtendente}",
        "senhaAtendente": "${senhaAtendente}"
    }`;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.response == 'OK') {
                sendMessage('Enviado com sucesso!', 'success', 1500, true)
            } else {
                sendMessage('Email ou senha errados!', 'error', 1500, true)
            }
        }
    }
    xhr.send(data);
    sendMessage('Enviando o email...', 'info', 2500, true)
}
