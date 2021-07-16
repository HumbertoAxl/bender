let produtos = []
function Buildar() {
    produtos.splice(0, produtos.length);
    let arrayProd;
    let valor = document.getElementById('codigo').value
    valor = valor.replace(/<tr><th>/g, "','").replace(new RegExp('</th><td>', 'g'), ":','").replace(new RegExp('</td></tr>', 'g'), "").replace(new RegExp('<table>', 'g'), "").replace(new RegExp('</table>', 'g'), "")
    valor = tratarCaracteresEspeciais(valor)
    let valorConvertido = valor.split('^');
    console.log(valor)
    for (let i = 0; i < valorConvertido.length; i++) {
        arrayProd = valorConvertido[i];
        arrayProd = arrayProd.replace("\n", "").replace("['", "").replace("']", "");
        arrayProd = arrayProd.split("','");
        produtos.push(arrayProd);
    }
    return produtos;
}

function Converter() {
    Buildar();
    let valor = document.getElementById('codigo').value
    produtosConvertidos = ordenarProdutos();
    try {
        if (valor == "") {
            sendMessage('Array vazio', 'warning')
            tHide(document.getElementById("resultado"))
        } else {
            resultado = JSON.stringify(produtosConvertidos);
            document.getElementById("textResultado").innerHTML = resultado
            tShow(document.getElementById("resultado"))
            sendMessage('Conversão realizada com sucesso!', 'success')
            return resultado
        }
    }
    catch (e) {
        console.log('Erro na conversão:')
        console.log(e)
        sendMessage('Array inválido', 'error', 1800, false, "Por favor corrija e tente novamente")

    }
    finally {
        produtos.splice(0, produtos.length);
    }
}

function Listar() {
    Buildar();
    listaAtributos = pegarTodosAtributos();
    try {
        if (listaAtributos.length == 0) { //Melhorar futuramente
            sendMessage('Array vazio ou sem atributos','warning')
            tHide(document.getElementById("resultado"))
        } else {
            resultado = JSON.stringify(listaAtributos);
            document.getElementById("textResultado").innerHTML = resultado
            tShow(document.getElementById("resultado"))
            sendMessage('Listagem realizada com sucesso!','success')
            return resultado
        }
    }
    catch (e) {
        sendMessage('Erro na construção do array', 'error', 1800, false, "Verifique o inspecionar elemento")
    }
    finally {
        produtos.splice(0, produtos.length);
    }
}

function pegarAtributosPorProduto() { //Array contendo atributos específicos de cada Produto //1
    try {
        let dadosProduto = [];
        for (let i = 0; i < produtos.length; i++) {
            let atributos = [];
            console.clear();
            nome = produtos[i][0];
            console.log('Ordenando o produto '+nome+' da linha ' + (i + 1))
            for (let j = 1; j < produtos[i].length;) {
                let regex = new RegExp(/(?<=)(.*)(?=:)/g)
                let resultadoAtributos = regex.exec(produtos[i][j]).splice(0, 1);
                resultadoAtributos = resultadoAtributos.toString();
                console.log(resultadoAtributos + ' - ok')
                atributos.push(resultadoAtributos);
                j = j + 2;
            }
            dadosProduto.push({ nome, atributos });
        }
        return dadosProduto
    }
    catch (e) {
        console.log(e)
        sendMessage('Erro na construção do array', 'error', 1800, false, "Verifique o inspecionar elemento")
        tHide(document.getElementById("resultado"))
    }
}

function atribuirAtributos() { //Atribui todos atributos para todos os produtos //3 - ok
    let allAtributos = pegarTodosAtributos();
    let dadosProduto = pegarAtributosPorProduto();
    try {
        for (let i = 0; i < dadosProduto.length; i++) {
            for (let j = 0; j < allAtributos.length; j++) {
                if (dadosProduto[i].atributos.includes(allAtributos[j]) == false) {
                    produtos[i].push(allAtributos[j] + ':');
                    produtos[i].push('Null');
                }
            }
        }
        return produtos;
    } catch (e) {
        console.log(e)
    }
}

function ordenarProdutos() { //Ordena e concatena nome e atributos //4
    let todosAtributos = pegarTodosAtributos();
    todosAtributos = todosAtributos.toString();
    atribuirAtributos();
    let atributos = [];
    let resultado = [];
    try {
        for (let i = 0; i < produtos.length; i++) {
            let nome = produtos[i][0];
            for (let j = 1; j < produtos[i].length;) {
                let juntarAtributos = [];
                juntarAtributos.push(produtos[i][j], produtos[i][j + 1]);
                let atributosJuntos = juntarAtributos.join();
                atributosJuntos = atributosJuntos.replace(',', ' ');
                atributos.push(atributosJuntos);
                j = j + 2;
            }
            atributos = atributos.sort();
            resultado.push({ nome, atributos });
            atributos = [];
        }
        return resultado;
    } catch (e) {
        // console.log(e)
    }
}

function pegarTodosAtributos() { //Array contendo todos atributos gerais dos produtos//2 - ok
    try {
        let todosAtributos = pegarAtributosPorProduto();
        let allAtributos = [];
        for (let i = 0; i < produtos.length; i++) {
            for (let j = 0; j < produtos[i].length / 2 - 1; j++) {
                allAtributos.push(todosAtributos[i].atributos[j]);
            }
        }
        allAtributos = [...new Set(allAtributos)];
        return allAtributos;
    } catch (e) {
        console.log(e)
        sendMessage('Erro na construção do array', 'error', 1800, false, "Verifique o inspecionar elemento")
        tHide(document.getElementById("resultado"))
    }
}

function CopiarResultado() {
    document.getElementById("textResultado").select();
    document.execCommand("copy");
    try {
        sendMessage("Copiado!","info", 800)
    }
    catch (e) {
        alert('Copiado')
    }
}