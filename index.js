
import { app } from './app.js'
import { port } from './config.js'
import { connectMongoDb } from './mongodb_connection/conn.js'

connectMongoDb()

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})



