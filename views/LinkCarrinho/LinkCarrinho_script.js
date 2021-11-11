function Adicionar() {
    Hide(document.getElementById("resultado"))
    let index = document.querySelectorAll('#menu > div.box').length + 1
    if (index <= 8) {
        document.querySelector('#menu').insertAdjacentHTML(
            'beforeend',
            `<div class="box">
        <div class="produtos">
            <label>Produto ${index}:<input id="prod${index}" name="prod${index}" type="text" autocomplete="off"/></label>
        </div>
        <div class="quantidade">
            <label>Quantidade:<input id="quant${index}" name="quant${index}" type="text" autocomplete="off"/></label>
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
        let box = document.querySelector(`div.box:nth-of-type(${index})`)
        box.remove()
        index = index - 1
    } else {
        sendMessage('Ação não permitida', 'error', 1200, true)
    }
}

async function Criar() {
    let index = document.querySelectorAll('#menu > div.box').length + 1
    let array = ['https://www.ferimport.com.br/checkout/cart/add?sc=1']
    let erro = false
    for (let i = 1; i < index; i++) {
        let sku = document.getElementById(`prod${i}`).value.trim()
        if (sku == '' || sku == '0') {
            sendMessage(`SKU do produto ${i} está vazio`, `error`, 1200)
            erro = true
        }
        let quant = document.getElementById(`quant${i}`).value.trim()
        if (quant == '' || quant == '0') {
            sendMessage(`Quantidade do produto ${i} está vazio`, `error`, 1200)
            erro = true
        }
        if (sku == '' && quant == '' || sku == '0' && quant == '0') {
            sendMessage(`SKU e quantidade do produto ${i} estão vazios`, `error`, 1200)
            erro = true
        }
        array.push(`&sku=${sku}&qty=${quant}&seller=1`)
    }
    if (erro == false) {
        array = array.join('')
        document.getElementById("textResultado").innerText = array
        sendMessage('Link criado com sucesso!',"success")
        tShow(document.getElementById("resultado"))
    } else {
        tHide(document.getElementById("resultado"))
    }
    return erro
}

async function listarProdutos() {
    let erro = await Criar()
    if (!erro) {
    let sku = [], quantidadeProduto = []
    let element = document.querySelector('body > div:nth-child(4) > table')
    let lista = document.querySelector('body > div:nth-child(4) > table > tbody')
    let quantidadeSKU = document.querySelectorAll('.produtos input').length
    for (let i = 0; i < quantidadeSKU; i++) {
    sku.push(document.querySelector(`#prod${i+1}`).value)
    quantidadeProduto.push(document.querySelector(`input#quant${i+1}`).value)
    }
    const response = await fetch('../../carrinho/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sku: sku, quantidadeSKU: quantidadeSKU, quantidadeProduto: quantidadeProduto })
    });
    if (!response.ok) {
        sendMessage("Erro inesperado!", "info", 2000)
    }
    let resposta = await response.text()
    element.style.display = "table";
    resposta = resposta.replace(/","/g,'')
    lista.innerHTML = resposta.substring(2).slice(0, -2)
}
}

function CopiarResultado() {
    document.getElementById("textResultado").select();
    document.execCommand("copy");
    try {
        sendMessage("Copiado!", "info", 800)
    }
    catch (e) {
        alert('Copiado')
    }
}
