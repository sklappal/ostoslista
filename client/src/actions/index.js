export const requestData = () => {
  return dispatch => {
    return fetch("http://localhost:4000/api/shoppinglist")
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

export const addItem = (text, category) => {
  return dispatch => {
    return fetch("http://localhost:4000/api/shoppinglist/items",
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: text, category: category})
    }).then(response => response.json())
    .then(json => dispatch(receiveData(json)));
  }
};

export const buyItem = (id)=> {
  return dispatch => {
    return fetch("http://localhost:4000/api/shoppinglist/items",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    }).then(response => response.json())
    .then(json => dispatch(receiveData(json)));
  }
};

export const returnItem = (id)=> {
  return dispatch => {
    return fetch("http://localhost:4000/api/shoppinglist/boughtItems",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    }).then(response => response.json())
    .then(json => dispatch(receiveData(json)));
  }
};