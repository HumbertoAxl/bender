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
        sendMessage('Campo de marca vazio!', 'info', null)
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

async function Remover() {
    let sku = parseInt(document.querySelector(`input[name='ImagemSKU']`).value)
    if (sku == '') {
        sendMessage('Campo do SKU vazio!', 'info', null)
    } else {    
        let user = Cookies.get('email').split('@')
        const response = await fetch('../../removerImagem/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sku: sku,
                user: user[0]
            })
        });
        let teste = await response.text()
        console.log(teste)
        // switch (response.status) {
            // case 200: sendMessage('Imagem deletada com sucesso!', 'success', null, 'true')
                // break
            // case 403: sendMessage('Você não tem acesso, entre em contato com o desenvolvedor', 'error', null, false)
                // break
        // }
    }
}