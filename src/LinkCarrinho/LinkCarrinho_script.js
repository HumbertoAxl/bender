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
            <label>Quantidade:<input id="quant${index}" name="quant${index}" type="text" autocomplete="off"/></label>
        </div>`
        )
    } else {
        sendMessage('Limite de produtos', 'warning', 1500, true, 'Limite de produtos atingido!')
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

function Criar() {
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