import desserts from './desserts.js';
import { dessertRepository, restaurantRepository, addDessert, addRestaurant} from './controller.js';

function getNextId() {
  idCounter += 1;
  return idCounter;
}
function getNextRestaurantId() {
  restaurantIdCounter += 1;
  return restaurantIdCounter;
}
function random_choose(arr, n) {
  const shuffled = arr.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function decrementId() {
  idCounter -= 1;

}
export function decrementRestaurantId() {
  restaurantIdCounter -= 1;

}
function createDessert(name, calories, fat, carbs, protein) {
  let id = -1; // the id doesn't matter here, it's computed in the database
  return { id, name, calories, fat, carbs, protein };
}

export function setDessertRepository(repo) {
  dessertRepository = repo;

}
export function setRestaurantRepository(repo) {

  restaurantRepository = repo;
}
function createRestaurant(dessertId, name, address, housingSpace, rating){
  let id = getNextRestaurantId();
  return {id, dessertId, name, address, housingSpace, rating};
}
function returnDesserts(count) {
  let chosen = random_choose(desserts, count);
  let repo = []
  chosen.forEach((element) => {
    let obj = createDessert(element, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
    repo.push(obj);
  });
  return repo;
}
// function returnRestaurants(){
//   let repo = []
//   let restaurant1 = createRestaurant(1, "Restaurant1", "Address1", 100, 4.5);
//   let restaurant2 = createRestaurant(2, "Restaurant2", "Address2", 200, 4.0);
//   let restaurant3 = createRestaurant(3, "Restaurant3", "Address3", 300, 4.5);
//   let restaurant4 = createRestaurant(4, "Restaurant4", "Address4", 400, 4.0);
//   let restaurant5 = createRestaurant(5, "Restaurant5", "Address5", 500, 4.5);
//   repo.push(restaurant1);
//   repo.push(restaurant2);
//   repo.push(restaurant3);
//   repo.push(restaurant4);
//   repo.push(restaurant5);
//   return repo;
// }



export function generateAndAddDesserts(count) {
  let newEntities = returnDesserts(count);
  for (let i = 0; i < newEntities.length; i++) {
    addDessert(newEntities[i]);
  }
}
// export function addDessert(obj) {
//   let id = getNextId();
//   obj.id = id;
//   dessertRepository.push(obj);

// }

// export function addRestaurant(obj){
//   let id = getNextRestaurantId();
//   obj.id = id;
//   restaurantRepository.push(obj);
// }

