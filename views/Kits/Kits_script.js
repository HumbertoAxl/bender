function Adicionar() {
    Hide(document.getElementById("resultado"))
    let index = document.querySelectorAll('#menu > div.box').length + 1
    if (index <= 7) {
        document.querySelector('#menu').insertAdjacentHTML(
            'beforeend',
            `<div class="box">
        <div class="produtos">
            <label>Produto ${index}:<input id="prod${index}" name="prod${index}" type="text" autocomplete="off"/></label>
        </div>
        <div class="quantidade">
            <label>Qtd:<input id="quant${index}" name="quant${index}" type="text" autocomplete="off"/></label>
        </div>
        <div class="preco">
        <label>Preço:<input id="preco${index}" name="preco${index}" type="text" autocomplete="off" /></label>
        </div>`
        )
    } else {
        sendMessage('Limite de produtos atingido!', 'warning', 1500, true)
    }
}

function Remover() {
    Hide(document.getElementById("resultado"))
    let index = document.querySelectorAll('.produtos input').length
    if (index > 1) {
        let box = document.querySelector(`div.box:nth-of-type(${index + 1})`) //+1 por causa da div do ID do Kit
        box.remove()
        index = index - 1
    } else {
        sendMessage('Ação não permitida', 'error', 1200, true)
    }
}

async function validarFormulario() { //Chamada dentro de listarProdutos
    let index = document.querySelectorAll('#menu > div.box').length + 1
    let erro = false
    let idKit = document.querySelector('#kitID').value.trim()
    for (let i = 1; i < index; i++) {
        let id = document.getElementById(`prod${i}`).value.trim()
        let quantidade = document.getElementById(`quant${i}`).value.trim()
        let preco = document.getElementById(`preco${i}`).value.trim()
        if (idKit === '' || id === '' || quantidade === '' || preco === '') {
            sendMessage('Preencha todos os campos!', 'error', 1200, true)
            return erro = true
        }
    }
    return erro
}

async function subirProdutos() {
    let erro = await validarFormulario()
    let idKit = document.querySelector('#kitID').value
    let idProduto = [], quantidadeProduto = [], precoProduto = []
    if (!erro) {
        for (let i = 0; i < document.querySelectorAll('.produtos input').length; i++) {
            idProduto.push(document.querySelector(`#prod${i + 1}`).value)
            quantidadeProduto.push(document.querySelector(`input#quant${i + 1}`).value)
            precoProduto.push(document.querySelector(`input#preco${i + 1}`).value)
        }
        const response = await fetch('../../KitsVTEX/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idKit: idKit, idProduto: idProduto, quantidadeProduto: quantidadeProduto, idProduto: idProduto, precoProduto: precoProduto})
        });
        console.log(response)
        if (!response.ok) {
            sendMessage("Erro! Verifique as informações inseridas", "error", 2000)
        } else {
            sendMessage("Produtos adicionados com sucesso!", "success", 2000)
        }
    }
}

async function visualizarKit() {
    let idKit = document.querySelector('#kitID').value.trim()
    let element = document.querySelector('body > div:nth-child(4) > table')
    let lista = document.querySelector('body > div:nth-child(4) > table > tbody')
    tHide(element, 200)
    sendMessage('Enviando solicitação...', "info", null)
    if (idKit) {
        const response = await fetch('../../pegarInfoKit/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idKit: idKit })
        });
        console.log(response)
        if (!response.ok) {
            sendMessage("Kit não encontrado", "error", 2000)
        } else {
            sendMessage("Operação realizada com sucesso!", "success", 2000)
            let resposta = await response.text()
            tShow(element, 'table')
            resposta = resposta.replace(/","/g,'').replace(/,/g,'')
            lista.innerHTML = resposta.substring(2).slice(0, -2)
        }
    } else {
        sendMessage("Campo vazio!", "info", 1000)
    }
}