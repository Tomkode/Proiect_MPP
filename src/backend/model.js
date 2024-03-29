let idCounter = 0;
function getNextId(){
  idCounter += 1;
  return idCounter;
}
export function createData( name, calories, fat, carbs, protein) {
  let id = getNextId();
    return { id, name, calories, fat, carbs, protein };
  }

  export function returnEntities(){
    let hardcoded = [];
    hardcoded.push(createData('Frozen yoghurt', 159, 6.0, 24, 4.0))
  hardcoded.push(createData('Ice cream sandwich', 50, 9.0, 37, 4.3))
  hardcoded.push(createData('Eclair', 262, 16.0, 24, 6.0))
  hardcoded.push(createData('Cupcake', 240, 3.7, 67, 4.3))
  hardcoded.push(createData('Gingerbread', 128, 16.0, 49, 3.9))
  return hardcoded;
  }
  export let repository = returnEntities();