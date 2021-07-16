let produtos = []
let resultado;

function Inserir() {
    let Marca = document.getElementById('Marca').value
    let valorInput = document.getElementById('codigo').value
    let valor = tratarCaracteresEspeciais(valorInput)
    let NomeProduto = valor.split('^');
    try {
        if (Marca == "") {
            sendMessage('Insira a marca','warning')
            tHide(document.getElementById("resultado"))
        } else {
            if (NomeProduto == "") {
                sendMessage('Array vazio','warning')
                tHide(document.getElementById("resultado"))
            } else {
                sendMessage('Inserção realizada com sucesso!',"success")
                for (let i = 0; i < NomeProduto.length; i++) {
                    let nomeConvertido = NomeProduto[i]
                    nomeConvertido = NomeProduto[i].replace("\n", "").replace("['", "").replace("]", "").replace("'", "")
                    nomeConvertido = nomeConvertido.split(',')
                    produtos.push(nomeConvertido[0].split(' '))
                    produtos[i].splice(nomeConvertido[1], 0, Marca)
                    produtos[i] = produtos[i].toString().replace(/,/g, ' ')
                    produtos[i] = produtos[i].replace(/VIRGULA/g,',')
                    produtos[i] = produtos[i].replace(/ASPASSIMPLES/g,"'")
                    produtos[i] = produtos[i].replace(/ASPASDUPLAS/g,'"')
                }
                resultado = JSON.stringify(produtos).toString();
                document.getElementById("textResultado").innerHTML = resultado
                tShow(document.getElementById("resultado"))
            }
        }
    }
    catch (e) {
        sendMessage('Array inválido','error',undefined,undefined,'Por favor corrija e insira novamente')
        console.log(e)
    }
    finally {
        produtos.splice(0, produtos.length);
    }
}

function CopiarResultado() {
    document.getElementById("textResultado").select();
    document.execCommand("copy");
    sendMessage("Copiado!", "success")
}