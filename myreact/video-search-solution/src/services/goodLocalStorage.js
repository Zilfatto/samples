// Setting data into sessionStorage
function setItem(key, value) {
  if (!key || !value) return;
  localStorage[key] = JSON.stringify(value);
}
// Getting data from localStorage
function getItem(key) {
  const data = localStorage[key];
  if (data) return JSON.parse(data);
  return data;
}

export default {
  setItem,
  getItem
}