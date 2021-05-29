const BASE_URL = 'https://api.movies.ivart.nomoredomains.club';

const getResponse = (res) => {
  if (res.ok) {
    return(res.json());
  } else {
    return res.json()
      .then((err) => {
        throw new Error(err.message);
      })
  }
};

export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email, name }),
    credentials: 'include',
  })
    .then(getResponse)
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then(getResponse)
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  })
    .then(getResponse)
};