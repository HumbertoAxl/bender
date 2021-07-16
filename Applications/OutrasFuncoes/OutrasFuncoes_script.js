function VerificarMarca() {
    let marca;
    let codigo;
    marca = document.getElementById('Marca').value
    if (marca !== "") {
        for (let i = 0; i < listaMarcas.length; i++) {
            if (listaMarcas[i][1] == marca.toString()) {
                codigo = listaMarcas[i][0].toString()
                return sendMessage('O código da ' + marca + ' é ' + codigo, 'success', null)
            }
        }
        return sendMessage('Não foi encontrado o código da marca ' + marca, 'error', null)
    } else {
        sendMessage('Campo de marca vazio!', 'info')
    }
}
function Listar() {
    let lista = [];
    let nomeMarca;
    for (let i = 0; i < listaMarcas.length; i++) {
        nomeMarca = listaMarcas[i][1]
        lista.push(nomeMarca)
    }
    lista = lista.toString()
    lista = lista.replace(/,/g, "<br>")
    sendMessage('', '', null, false, '', lista)
}