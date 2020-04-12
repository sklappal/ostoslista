const http = require('http');
const { Client } = require('pg')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {

  const client = new Client()
  await client.connect()
  const qres = await client.query('SELECT * from ostoslista')
  console.log(qres.rows[0]) // Hello world!
  await client.end()
  
  
  res.statusCode = 200;
  
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});