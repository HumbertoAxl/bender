// document.getElementById('upload').addEventListener('change', handleFileSelect, false);
let ExcelToJSON = function () {
        this.parseExcel = function (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = e.target.result;
                let workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(function (sheetName) {
                    // Here is your object
                    let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    let json_object = JSON.stringify(XL_row_object);
                    let resultado = JSON.parse(json_object)
                    console.log(resultado);
                })
            };
            reader.onerror = function (ex) {
                console.log(ex);
            };
            reader.readAsBinaryString(file);
        };
    };

    function handleFileSelect(evt) {
        let files = evt.target.files; // FileList object
        let xl2json = new ExcelToJSON();
        xl2json.parseExcel(files[0]);
    }
