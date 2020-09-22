const express = require('express')
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.static(path.join(__dirname,"public")))

app.use(routes)

const porta = 3000

app.listen(porta,()=>{
    console.log(`Servidor rodando na porta ${porta}`)
})


