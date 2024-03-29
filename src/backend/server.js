import {repository} from "./model.js"
import express from 'express'
const app = express()
const port = 5123;
console.log(JSON.stringify(repository));

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Hello World!')
    });
app.get('/desserts' , (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
   res.send(JSON.stringify(repository));
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
