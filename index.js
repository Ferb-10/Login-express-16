import express from 'express'; 
import bodyParser from 'body-parser';
import {dirname} from 'path'; 
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express(); 
const port = 3000; 

var userIsAuthorised = false; 

// custom middleware.      nextを必ず含む
function passwordChecker(req, res, next) {
    const username = req.body['username']; // name attribiteに対応
    const password = req.body['password']; // name attribiteに対応
    if (username === 'Ferb' && password === '12345') {
        userIsAuthorised = true; 
    }
    next(); 
}


// middle waresの読み込み
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')); // ここ

app.use(passwordChecker); 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
})

app.post('/check', (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + '/public/secret.html')
    } else {
        res.sendFile(__dirname + '/public/index.html'); 
    }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})