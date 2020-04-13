var express = require('express');
var app = express();
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

var myLogger = function (req, res, next) {
  console.log('=> ' + JSON.stringify(req.body))
  next()
}
app.use(myLogger);
const config = require('config');


var MongoClient = require('mongodb').MongoClient;
var url = config.get('mongo');

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
  const json = JSON.stringify(obj);
  console.log("<= 200" + json);
  res.end(json);
}

const return400 = (res) => {
  res.statusCode = 400;
  console.log("<= 400");
  res.end();
}

const return404 = (res) => {
  res.statusCode = 404;
  console.log("<= 404");
  res.end();
}

app.route('/shoppinglist').get((req, res) => {
  documentAccess((document) => {
    if (document == null) {
      return404(res);
    } else {
      returnJson(document, res);
    }
  });
});

app.route('/shoppinglist/items/add').post((req, res) => {
  documentAccess((document, collection) => {
    if (document == null) {
      return404(res);
      return;
    }
    
    const newId = Math.max(Math.max(...document.items.map(i => i.id)), Math.max(...document.boughtItems.map(i => i.id))) + 1;
    const newItem = {
      id: Number.isInteger(newId) ? newId : 0,
      text: req.body.text,
      category: req.body.category,
      addedTime: new Date().getTime()
    };
    collection.updateOne({}, {$set: {"items": document.items.concat(newItem)}}, (err, _) => {
      if (err) throw err;
      documentAccess(doc => {
        returnJson(doc, res);
      })
    });
  })
});

app.route('/shoppinglist/items/buy').post((req, res) => {
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

app.route('/shoppinglist/items/return').post((req, res) => {
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

const hostname = config.get('host');
const port = config.get('port');
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
