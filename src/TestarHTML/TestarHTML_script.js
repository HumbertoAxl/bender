function Testar() {
    Hide(document.getElementById('testarHTML'))
    if (document.getElementById('isHTML').checked == false && document.getElementById('isTabela').checked == false) {
        sendMessage('Escolha uma opção', 'warning')
    } else {
        if (document.getElementById('codigo').value == "") {
            sendMessage('Código vazio', 'warning')
            tHide(document.getElementById('tabela'))
        } else {
            if (document.getElementById('isTabela').checked) {
                sendMessage('Tabela inserida com sucesso', 'success')
                tShow(document.getElementById('testarHTML'), 999)
                document.getElementById('testarHTML').innerHTML = '<table id ="tabela"></table>'
                document.getElementById('tabela').innerHTML = document.getElementById('codigo').value
            } else {
                sendMessage('Código inserido com sucesso', 'success')
                document.getElementById('testarHTML').innerHTML = document.getElementById('codigo').value
                tShow(document.getElementById('testarHTML'), 999)
            }
        }
    }
}

function CheckedHTML() {
    if (document.getElementById('isHTML').checked == true) {
    document.getElementById('opcoesHTML').style.display = 'block'
    } else {
    document.getElementById('opcoesHTML').style.display = 'none'
    }
    document.getElementById('isTabela').checked = false
    Hide(document.getElementById('tabela'))
    if (document.getElementById('HTML_FundoBranco').checked == true) {
        document.getElementById('testarHTML').style.backgroundColor = 'white'
    }
}

function CheckedTabela() {
    document.getElementById('testarHTML').style.backgroundColor = ''
    document.getElementById('testarHTML').innerHTML = ''
    document.getElementById('opcoesHTML').style.display = 'none'
    document.getElementById('isHTML').checked = false
}

function FundoBranco() {
    if (document.getElementById('HTML_FundoBranco').checked == true) {
        document.getElementById('testarHTML').style.backgroundColor = 'white'
    } else {
        document.getElementById('testarHTML').style.backgroundColor = ''
    }
}

function LetrasBrancas() {
    if (document.getElementById('HTML_LetrasBrancas').checked == true) {
        document.getElementById('testarHTML').style.color = 'white'
    } else {
        document.getElementById('testarHTML').style.color = ''
    }
}