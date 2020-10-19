import goodLocStorage from './goodLocalStorage';

const usersKey = 'users';

export const authorise = async ({ username, password }) => {
  const users = goodLocStorage.getItem(usersKey);

  if (users) {
    const currentUser = users.filter(user => user.username === username)[0];
    if (currentUser) {
      if (password !== currentUser.password) throw new Error('Неверный пароль');
      return currentUser;
    }
  }
  return createUser(users, username, password);
};

function createUser(users = [], username = '', password = '') {
  const user = {
    id: Date.now(),
    username,
    password,
    favourites: []
  };

  users.push(user);
  goodLocStorage.setItem(usersKey, users);
  return user;
}

export const saveUserData = (id, favourites = []) => {
  const users = goodLocStorage.getItem(usersKey);
  const index = users.findIndex(user => user.id === id);
  users[index].favourites = favourites;
  goodLocStorage.setItem(usersKey, users);
};