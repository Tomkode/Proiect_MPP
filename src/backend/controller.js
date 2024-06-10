import fs from 'node:fs'
//import { dessertRepository } from './model.js'
//import { restaurantRepository , setDessertRepository, setRestaurantRepository} from './model.js'
import mysql from 'mysql'
// import bcrypt from 'bcryptjs'
import CryptoJS from 'crypto-js'
export const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MPP'
})
// export const connection = mysql.createConnection({
//     host: "mpp.chy0oiuwuiec.eu-north-1.rds.amazonaws.com",
//     port: "3306",
//     user: "root",
//     password: "Password1",
//     database: "mpp"
//   });
export let dessertRepository
export let restaurantRepository 
await getDesserts();
await getRestaurants();



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
export async function getUser(id){
    let retrieval = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Users WHERE id = ?', id, (err, result, fields) => {
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
    let repo = await retrieval()
    .then((data) => {
        return data;
    }, (err) => {
        console.log(err)
    });
    return repo;


}
export async function checkUser(user){
    let retrieval = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Users WHERE username = ?', user.username, (err, result, fields) => {
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
    let repo = await retrieval()
    .then((data) => {
        return data;
    }, (err) => {
        console.log(err)
    });
    return repo;

}
export async function registerUser(user){
    user.password = CryptoJS.SHA1(user.password).toString();
    let insertion = () => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Users SET ?', user, (err, result) => {
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
        console.log("User added")
    }, (err) => {
        console.log("User not added");
    });

}
export async function loginUser(user){
    user.password = CryptoJS.SHA1(user.password).toString();
    let userData = await checkUser(user);
    if(userData.length == 0)
    return [];
console.log("'" + userData[0].password + "'")
console.log("2nd hash: " + user.password);
    if(userData[0].password == user.password)
    {
        return [userData[0].id];
    }
    
    // let retrieval = () => {
    //     return new Promise((resolve, reject) => {
    //         connection.query('SELECT id FROM Users WHERE username = ? AND password = ?', [user.username, user.password], (err, result, fields) => {
    //             if(err){
    //                 console.log(err)
    //                 reject(err);
    //             }
    //             else{
    //                 resolve(result);
    //             }
    //         })
    //     });
    // }
    // let repo = await retrieval()
    // .then((data) => {
    //     //console.log(data)
        
    //     return data;
    // }, (err) => {
    //     console.log(err)
    // });
    // //console.log(repo);
    //return repo;

}
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