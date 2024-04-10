import desserts from './desserts.js';
let idCounter = 0;

function getNextId(){
  idCounter += 1;
  return idCounter;
}

function random_choose(arr, n) {
  const shuffled = arr.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function decrementId(){
  idCounter -= 1;
  
}
function createData( name, calories, fat, carbs, protein) {
  let id = getNextId();
    return { id, name, calories, fat, carbs, protein };
  }

function returnEntities(count){
    let chosen = random_choose(desserts, count);
    let repo = []
    chosen.forEach((element) => {
      let obj = createData(element, Math.floor(Math.random() * 1000), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
      repo.push(obj);
    });
  return repo;
  }
  
  export let repository = returnEntities(2);

  export function generateAndAddEntities(count){
    let newEntities = returnEntities(count);
    repository = repository.concat(newEntities);
  }
  export function addEntity(obj){
    let id = getNextId();
    obj.id = id;
    repository.push(obj);

  }

  