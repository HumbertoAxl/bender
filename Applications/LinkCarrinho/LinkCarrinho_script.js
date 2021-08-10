
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