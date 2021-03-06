export const requestData = () => {
  return dispatch => {
    return fetch(process.env.REACT_APP_API_BASE + "shoppinglist")
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)));
  }
};

export const receiveData = (data) =>  {
  return ({
    type: 'RECEIVE_DATA',
    data: data
  });
};

const postRequest = (url, obj) => {
  return fetch(process.env.REACT_APP_API_BASE + url,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
}

export const addItem = (text, comment, category) => {
  return dispatch => {
    return postRequest("shoppinglist/items/add", {text: text, comment: comment, category: category})
    .then(response => response.json())
    .then(json => dispatch(receiveData(json)));
  }
};

export const buyItem = (id)=> {
  return dispatch => {
    return postRequest("shoppinglist/items/buy", {id:id})
    .then(response => response.json())
    .then(json => dispatch(receiveData(json)));
  }
};

export const returnItem = (id)=> {
  return dispatch => {
    return postRequest("shoppinglist/items/return", {id:id})
    .then(response => response.json())
    .then(json => dispatch(receiveData(json)));
  }
};

export const removeItem = (id)=> {
  return dispatch => {
    return postRequest("shoppinglist/items/remove", {id:id})
    .then(response => response.json())
    .then(json => dispatch(receiveData(json)));
  }
};
