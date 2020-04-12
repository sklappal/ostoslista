let nextItemId = 0
export const addItem = (text, category) => ({
  type: 'ADD_ITEM',
  id: nextItemId++,
  text: text,
  category: category
});

export const buyItem = (id) => ({
  type: 'BUY_ITEM',
  id: id
})

export const returnItem = (id) => ({
  type: 'RETURN_ITEM',
  id: id
})