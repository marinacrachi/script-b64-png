/**
 * 
 * Script de conversão de b64 de um json para png
 * 
 *  ==> O script irá ler a pasta raíz, as subpastas e os jsons dentro delas, criando uma imagem para cada b64 do json
 * |- file
 *  |- folder 2
 *    |-- File1.json
 *  |- folder 2
 *    |-- File2.json
 * 
 */

const express = require('express')
const app = express()
const port = 3000
var diretorioRaiz = ''
var fs = require('fs');
var path = require('path');

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)

    fs.readdir(diretorioRaiz, function (err, pastas) {
        pastas.forEach(pasta => {
            fs.readdir(diretorioRaiz + '/' + pasta, function (err, arquivos) {
                arquivos.forEach((arquivo) => {
                    fs.readFile(diretorioRaiz + '/' + pasta + '/' + arquivo, 'utf8', function (err, contents) {

                        // Corta o último caractere do json e transforma em um array de objetos
                        // Se o arquivo já for um array de objetos, comentar essa linha
                        contents = JSON.parse("[" + contents.substring(0, contents.length - 1) + "]");
                        contents.forEach((content) => {

                            // Nomeia o arquivo de acordo com o json
                            let nomeArquivo = "f" + content.id
                            let diretorio = diretorioRaiz + '/' + pasta

                            // mudar content.b64 para o campo que contém o b64
                            base64ToPNG(content.b64, diretorio, nomeArquivo)
                        })

                    })
                })
            })
        });
    })
})

function base64ToPNG(data, dir, fileName) {

    data = data.replace(/^data:image\/png;base64,/, '');
    try {
        fs.writeFile(path.resolve(dir, fileName + '.png'), data, 'base64', function (err) {
            if (err) {
                console.log(err)                
            } 
        });
    } catch (e) {

        console.log("deu erro e");
        console.log(e);
    }
}

module.exports = base64ToPNG;