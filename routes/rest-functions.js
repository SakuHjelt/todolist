function save () {
    fs.writeFile('userData.json', JSON.stringify(userData), () => { console.log('Dataentry saved.')})
}


module.exports = {
    save: save, 
    log: function (msg) {console.log(msg)}
}