const credencials = require("./config/bender-ferimport-62542b406767.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
exports.credencials = credencials;
exports.id = function (idSheet) {
    const doc = new GoogleSpreadsheet(idSheet);
    return doc;
}