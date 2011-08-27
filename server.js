var http = require('http'),
    nko  = require('nko')('+jzq0Dm9hbErZbrq');

var app = http.createServer(function (req, res) { 
  res.writeHead(200, { 'Content-Type': 'text/html' }); 
  res.end('Hello, World'); 
});

app.listen(process.env.NODE_ENV === 'production' ? 80 : 8000, function() {
  console.log('Ready');

  // if run as root, downgrade to the owner of this file
  if (process.getuid() === 0)
    require('fs').stat(__filename, function(err, stats) {
      if (err) return console.log(err)
      process.setuid(stats.uid);
    });
});

console.log('Listening on ' + app.address().port);
