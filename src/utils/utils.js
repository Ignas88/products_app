export const setLocStorage = (name, data) => {
  try {
    window.localStorage.setItem(name, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const getItem = (name, id) => {
  try {
    const items = JSON.parse(window.localStorage.getItem(name));
    return items.find(item => item.id === id);
  } catch (e) {
    console.log(e);
    return null;
  }
};