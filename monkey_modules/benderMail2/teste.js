const benderMail2  = require('./benderMail2');
async function teste () {
let a = await benderMail2.send('FerimportBot')
console.log(a)
}

teste()