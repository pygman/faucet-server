const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');
const {initContract, claimTestToken} = require('./utils/contract')
const {validClaimArgs} = require('./utils/address')
const log = console.log.bind(console)
const port = 3089
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse application/json
app.use(bodyParser.json())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(cors()) // Use this after the variable declaration


// serve static assets normally
app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
    log('receive a request get /: ')
    res.sendFile(path.join('index.html'));
})

app.post('/api/claimTestToken', (req, res) => {
    const params = req.body
    log('receive a request: ', params)

    if (!validClaimArgs(params)) {
        log(`invalid params!`)
        return
    }

    claimTestToken(params).then(
        (tx) => {
            log('sent tx: ', tx.hash)
            res.json({
                txHash: tx.hash
            })
        }
    )
})


const main = async () => {
    await initContract()

    app.listen(port, () => {
        log(`Faucet server listening at http://localhost:${port}`)
    })
}

main().then()
