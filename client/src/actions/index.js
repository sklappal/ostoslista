export const requestData = () => {
  return dispatch => {
    return fetch("api/shoppinglist")
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
    return fetch("api/shoppinglist/items/add",
    {
      method: "POST",
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
    return fetch("api/shoppinglist/items/buy",
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
    return fetch("api/shoppinglist/items/return",
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
