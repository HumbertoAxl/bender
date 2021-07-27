function MeuComponente() {
    return(
        <div>
            <h1>Teste React</h1>
            <p>Vamos testar</p>
        </div>
    )
}

const root = document.getElementById('root')
ReactDOM.render(<MeuComponente />, root)