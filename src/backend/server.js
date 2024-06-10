import {addDessert, dessertRepository, addRestaurant, restaurantRepository, deleteDessert, deleteRestaurant, editDessert, editRestaurant, getDesserts, getRestaurants} from './controller.js';
import {generateAndAddDesserts} from './model.js';
import { registerUser , loginUser, checkUser, getUser} from './controller.js';
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'; // Import the cors package
import {Server} from 'socket.io'
import http, { get } from 'http'

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
    //console.log(dessertRepository)
    res.send(JSON.stringify(dessertRepository));
});
app.options('/dessert/add', cors()); // Enable pre-flight request for POST
app.post('/dessert/add', cors(), (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Headers', 'Content-Type');
    // console.log(req.body);
    addDessert(req.body);
    getDesserts();
    res.send('Entity added');
});
app.post('/register', cors(), async (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Headers', 'Content-Type');
    // console.log(req.body);
    let id = await checkUser(req.body);
    console.log(id.length);
    if(id.length != 0)
    {
        res.send("error");
        return ;
    }
    registerUser(req.body);
    res.send('User registered');
});
app.post("/login",async  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = await loginUser(req.body);
    //console.log(id)
    res.send(id);
})
app.get("/user/:id", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    let user = await getUser(id);
    //console.log(user)
    res.send(user);
});
app.get('/dessert/details/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    let entity = dessertRepository.find((element) => element.id === id);
    res.send(entity);
});
app.delete('/dessert/delete/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    deleteDessert(id);
    res.send('Entity deleted');
    getDesserts();
    getRestaurants()
})
app.options('/dessert/edit/:id', cors());
app.put('/dessert/edit/:id', cors(),  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    editDessert(id, req.body);
    res.send('Entity updated');
    getDesserts();
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
            generateAndAddDesserts(1);
            getDesserts();
            io.emit('generated');
        }, 5000)
    })
    socket.on("stopgenerating", () => {
        console.log("stop generating")
        clearInterval(intervalId)
    })
});


app.get('/restaurants', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(restaurantRepository));
});
app.options('/restaurant/add', cors()); // Enable pre-flight request for POST
app.post('/restaurant/add', cors(), (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Access-Control-Allow-Headers', 'Content-Type');
    // console.log(req.body);
    addRestaurant(req.body);
    res.send('Entity added');
    getRestaurants();
});
app.get('/restaurant/details/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    let entity = restaurantRepository.find((element) => element.id === id);
    res.send(entity);
});
app.delete('/restaurant/delete/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    deleteRestaurant(id);
    res.send('Entity deleted');
    getRestaurants();
})
app.options('/restaurant/edit/:id', cors());
app.put('/restaurant/edit/:id', cors(),  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let id = parseInt(req.params.id);
    editRestaurant(id, req.body);
    res.send('Entity updated');
    getRestaurants();
})
server.listen(port)