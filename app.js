const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const app = express()


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => console.log(`App..${PORT}...`))
    } catch (e) {
        console.log('Server Erro', e.message);
        process.exit(1)
    }
}



start()