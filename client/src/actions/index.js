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

export const addItem = (text, category) => {
  return dispatch => {
    return postRequest("shoppinglist/items/add", {text: text, category: category})
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
