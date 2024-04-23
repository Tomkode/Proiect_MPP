import fs from 'node:fs'
//import { dessertRepository } from './model.js'
//import { restaurantRepository , setDessertRepository, setRestaurantRepository} from './model.js'
import mysql from 'mysql'
export const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MPP'
})
export let dessertRepository
export let restaurantRepository 
await getDesserts();
await getRestaurants();
//console.log(dessertRepository)

// export function readDesserts(){
//     try{
//         let data = fs.readFileSync('./desserts.json')
//         setDessertRepository(JSON.parse(data));
//     }
//     catch(e){
//         console.log(e)
//     }
// }
// export function readRestaurants(){
//     try{
//         let data = fs.readFileSync('./restaurants.json')
//         setRestaurantRepository(JSON.parse(data));
//     }
//     catch(e){
//         console.log(e)
//     }
// }
// export function writeDesserts(){
//     fs.writeFileSync('./desserts.json', JSON.stringify(dessertRepository))
// }
// export function writeRestaurants(){
//     fs.writeFileSync('./restaurants.json', JSON.stringify(restaurantRepository))
// }


export async function getDesserts(){
    let repo = []
    let retrieval = () => {
        return new Promise((resolve, reject) => {
            
            connection.query('SELECT * FROM Desserts', (err, result, fields) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            
        });
    }
    repo =  await retrieval()
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
    //console.log(repo);
    dessertRepository = repo;
}

export async function getRestaurants(){
    let repo = []
    let retrieval = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Restaurants', (err, result, fields) => {
                if(err){
                    console.log("Eroare")
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
    }
    repo = await retrieval()
    .then((data) => {
        return data;
    }, (err) => {
        console.log(err)
    });
    //console.log(typeof repo)
    restaurantRepository = repo;
}

export async function addDessert(obj){
    let insertion = () => {
        return new Promise((resolve, reject) => {
            let {id, ...rest} = obj
            connection.query('INSERT INTO Desserts SET ?', rest, (err, result) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            //connection.end()
        });
    }
    insertion()
    .then((data) => {
        console.log("Entity added")
    }, (err) => {
        console.log("Entity not added")
    });
}
export async function addRestaurant(obj){
    let insertion = () => {
        return new Promise((resolve, reject) => {
            let {id, ...rest} = obj
            connection.query('INSERT INTO Restaurants SET ?', rest, (err, result) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            //connection.end()
        });
    }
    insertion()
    .then((data) => {
        console.log("Entity added")
    }, (err) => {
        console.log("Entity not added")
    });
}
export async function deleteDessert(id){
    let deletion = () => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Desserts WHERE id = ?', id, (err, result) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            //connection.end()
        });
    }
    deletion()
    .then((data) => {
        console.log("Entity deleted")
    }, (err) => {
        console.log("Entity not deleted")
    });
};
export async function deleteRestaurant(id){
    let deletion = () => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Restaurants WHERE id = ?', id, (err, result) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            //connection.end()
        });
    }
    deletion()
    .then((data) => {
        console.log("Entity deleted")
    }, (err) => {
        console.log("Entity not deleted")
    });
};
export async function editDessert(id, obj){
    let update = () => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Desserts SET ? WHERE id = ?', [obj, id], (err, result) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            //connection.end()
        });
    }
    update()
    .then((data) => {
        console.log("Entity updated")
    }, (err) => {
        console.log("Entity not updated")
    });
};
export async function editRestaurant(id, obj){
    let update = () => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Restaurants SET ? WHERE id = ?', [obj, id], (err, result) => {
                if(err){
                    console.log(err)
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            //connection.end()
        });
    }
    update()
    .then((data) => {
        console.log("Entity updated")
    }, (err) => {
        console.log("Entity not updated")
    });
};