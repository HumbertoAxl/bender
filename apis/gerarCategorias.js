const XLSX = require('xlsx')
const fetch = require('node-fetch');
const url = 'https://tfcvb6.vtexcommercestable.com.br/api/catalog_system/pub/category/tree/2';
exports.main = async function () {
  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-VTEX-API-AppKey': 'vtexappkey-tfcvb6-KGHSZZ',
      'X-VTEX-API-AppToken': 'BTKEFIGCSSFTKKUCQARNZXRORFHNHMARCOADHKNVVFURUVZTFASAVNJDCVMZASUFSORWJQVGMWRTCZUWGOIGUZWOEXALXOUDLOYGDDKPELNYVQACBQTLKNLTRDRLPJJY'
    }
  };
  let resultado = []
  await fetch(url, options)
    .then(res => res.json())
    .then(function (json) {
      for (let i = 0; i < json.length; i++) {
        let categoria = json[i]
        for (let i = 0; i < categoria.children.length; i++) {
          if (categoria.children[i].hasChildren === true) {
            for (let j = 0; j < categoria.children[i].children.length; j++) {
              resultado.push(JSON.parse(`{"id_departamento": ${categoria.id}, "nome_departamento": "${categoria.name}", "url_departamento": "${categoria.url}", "id_categoria": "${categoria.children[i].id}", "nome_categoria": "${categoria.children[i].name}", "url_categoria": "${categoria.children[i].url}", "id_subcategoria": "${categoria.children[i].children[j].id}", "nome_subcategoria": "${categoria.children[i].children[j].name}", "url_subcategoria": "${categoria.children[i].children[j].url}"}`))
            }
          } else {
            resultado.push(JSON.parse(`{"id_departamento": ${categoria.id}, "nome_departamento": "${categoria.name}", "url_departamento": "${categoria.url}", "id_categoria": "${categoria.children[i].id}", "nome_categoria": "${categoria.children[i].name}", "url_categoria": "${categoria.children[i].url}"}`))
          }
        }
      }
      // const workSheet = XLSX.utils.json_to_sheet(resultado);
      // const workBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workBook, workSheet, "categorias")
      // // Generate buffer
      // XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
      // // Binary string
      // XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
      // XLSX.writeFile(workBook, __dirname + "/teste.xlsx")
      // console.log(resultado)
    })
    .catch(err => console.error('error: ' + err));
  return resultado
}
