let id = 0;
let cache = localStorage.getItem("adressData");

if (cache) {
  let adressData = JSON.parse(cache);
  if (adressData.length) {
    id = Math.max(...adressData.map(el => el.ID));
  } else {
    id = 0;
  }
}
export const generateId = () => {
  id++;
  return id;
};
