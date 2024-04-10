import {repository, addEntity, decrementId, generateAndAddEntities} from "./model.js"
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'; // Import the cors package
import {Server} from 'socket.io'
import http from 'http'
const app = express()
const port = 5123;
app.use(bodyParser.json());
app.use(cors()); // Add the cors middleware
let server = http.createServer(app);
 
let io = new Server(server, {
    cors: {origin:"*", methods: ["GET", "POST", "PUT", "DELETE"]},
    transports: ['websocket']
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Hello World!')
});

app.get('/desserts', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(repository));
});
app.options('/dessert/add', cors()); // Enable pre-flight request for POST
app.post('/dessert/add', cors(), (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Headers', 'Content-Type');
    // console.log(req.body);
    addEntity(req.body);
    res.send('Entity added');
});
app.get('/dessert/details/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    let entity = repository.find((element) => element.id === id);
    res.send(entity);
});
app.delete('/dessert/delete/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    let index = repository.findIndex((element) => element.id === id);
    repository.splice(index, 1);
    res.send('Entity deleted');
    decrementId();
})
app.options('/dessert/edit/:id', cors());
app.put('/dessert/edit/:id', cors(),  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    let index = repository.findIndex((element) => element.id === id);
    repository[index] = req.body;
    res.send('Entity updated');
})


let intervalId = null;
io.on('connection', (socket) => {
    console.log("new user connected");
    
    socket.on("disconnect", () => {
        console.log("user disconnected")
        clearInterval(intervalId)
    })
    socket.on("startgenerating", () => {
        console.log("generating")
        intervalId = setInterval(() => {
            generateAndAddEntities(1);
            io.emit('generated');
        }, 5000)
    })
    socket.on("stopgenerating", () => {
        console.log("stop generating")
        clearInterval(intervalId)
    })
});



server.listen(port)