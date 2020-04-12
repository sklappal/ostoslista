var express = require('express');
var app = express();
const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

var myLogger = function (req, res, next) {
  console.log('=> ' + JSON.stringify(req.body))
  next()
  console.log('<= ')
}
app.use(myLogger);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

const collectionAccess = (fn) => {
  MongoClient.connect(url, {
    useUnifiedTopology: true    
  },  function (err, client) {
    if (err) throw err;
    var db = client.db('shoppinglist');
    fn(db.collection('shoppinglist'), db);
  });
};

const documentAccess = (fn) => {
  collectionAccess((coll, db) => {
    coll.findOne({}, {projection:{_id:0}}, function (findErr, result) {
      if (findErr) throw findErr;
      fn(result, db.collection('shoppinglist'));
    });
  })
};

documentAccess((document, collection) => {
  if (document == null) {
    collection.insertOne({items: [], boughtItems: []}, (err, _) => {
      if (err) throw err;
    });
  }
});

app.route('/').get((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

const returnJson = (obj, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

const return400 = (res) => {
  res.statusCode = 400;
  res.end();
}

const return404 = (res) => {
  res.statusCode = 404;
  res.end();
}

app.route('/api/shoppinglist').get((req, res) => {
  documentAccess((document) => {
    if (document == null) {
      return404(res);
    } else {
      returnJson(document, res);
    }
  });
});

app.route('/api/shoppinglist/items').put((req, res) => {
  documentAccess((document, collection) => {
    if (document == null) {
      return404(res);
      return;
    }
    
    const newId = Math.max(Math.max(...document.items.map(i => i.id)), Math.max(...document.boughtItems.map(i => i.id))) + 1;
    const newItem = {
      id: newId,
      text: req.body.text,
      category: req.body.category,
      timeAdded: new Date().getTime()
    };
    collection.updateOne({}, {$set: {"items": document.items.concat(newItem)}}, (err, _) => {
      if (err) throw err;
      documentAccess(doc => {
        returnJson(doc, res);
      })
    });
  })
});

app.route('/api/shoppinglist/items').post((req, res) => {
  documentAccess((document, collection) => {
    if (document == null) {
      return404(res);
      return;
    }
    const id = req.body.id;
    if (!document.items.map(i => i.id).includes(id)) {
      return400(res);
      return;
    }
    const boughtItem = {
      ...document.items.filter(it => it.id === id)[0],
      boughtTime: new Date().getTime()
    };
    const newDocument = {
      items: document.items.filter(it => it.id !== id),
      boughtItems: document.boughtItems.concat(boughtItem)
    };
    collection.replaceOne({}, newDocument, (err, _) => {
      if (err) throw err;
      returnJson(newDocument, res);
    });
  });
})

app.route('/api/shoppinglist/boughtItems').post((req, res) => {
  documentAccess((document, collection) => {
    if (document == null) {
      return404(res);
      return;
    }
    const id = req.body.id;
    if (!document.boughtItems.map(i => i.id).includes(id)) {
      return400(res);
      return;
    }
    const returnedItem = {
      ...document.boughtItems.filter(it => it.id === id)[0],
      boughtTime: null
    };

    const newDocument = {
      items: document.items.concat(returnedItem),
      boughtItems: document.boughtItems.filter(it => it.id !== id)        
    };

    collection.replaceOne({}, newDocument, (err, _) => {
      if (err) throw err;
      returnJson(newDocument, res);
    });
  });
})

const hostname = '127.0.0.1';
const port = 4000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});