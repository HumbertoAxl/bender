function Upload() {
    sendMessage('Solicitação de upload','info',false,false,false,'Envie um email com assunto "Upload de Arquivo no Drive" para <a href="mailto:humberto.axl@ferimport.com.br">humberto.axl@ferimport.com.br</a> com o arquivo desejado em anexo.<br>Apenas horário comercial de segunda a sexta.')
    document.querySelector('body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled').innerHTML = "Ok"
    // alert('Envie um email para humbertoaxl@gmail.com com o arquivo desejado.')
}