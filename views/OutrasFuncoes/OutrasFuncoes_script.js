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
    let sku = document.querySelector(`input[name='ImagemSKU']`).value
    let element = document.querySelector('body > div:nth-child(2) > table')
    let lista = document.querySelector('body > div:nth-child(2) > table > tbody')
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
        switch (response.status) {
            case 200: sendMessage('Operação concluída com sucesso!', 'success', null, true)
                break
            case 403: sendMessage('Você não tem permissão!', 'error', null, true)
                break
            case 404: sendMessage('SKU não encontrado!', 'error', null, true)
                break
        }
        let resposta = await response.text()
        setTimeout(() => element.style.display = "table", 1200)
        resposta = resposta.replace(/","/g, '')
        lista.innerHTML = resposta.substring(2).slice(0, -2)
    }
}

async function gerarLista() {
    const response = await fetch('../../listaCategorias/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    let data = await response.json()
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
        Sheets: {
            'Categorias': worksheet
        },
        SheetNames: ['Categorias']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    console.log(excelBuffer);
    saveAsExcel(excelBuffer, 'Categorias.xlsx');
    function saveAsExcel(buffer, filename) {
        const data = new Blob([buffer], { type: 'application/vnd.openxmlformats—officedocument.spreadsheetml.sheet;charset=UTF-8' })
        saveAs(data, filename)
    }
}