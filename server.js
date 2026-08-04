// ES5 self-upgrade wrapper for cPanel Phusion Passenger compatibility
var semverMajor = parseInt(process.versions.node.split('.')[0], 10);
if (semverMajor < 18) {
  var spawn = require('child_process').spawn;
  var fs = require('fs');
  var node20Path = '/opt/alt/alt-nodejs20/root/usr/bin/node';
  var node18Path = '/opt/alt/alt-nodejs18/root/usr/bin/node';
  
  var targetNode = fs.existsSync(node20Path) ? node20Path : (fs.existsSync(node18Path) ? node18Path : null);
  
  if (targetNode) {
    console.log('> Upgrading process from Node ' + process.version + ' to ' + targetNode);
    var child = spawn(targetNode, [__filename], { stdio: 'inherit', env: process.env });
    child.on('exit', function(code) { process.exit(code || 0); });
    return;
  }
}

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const port = process.env.PORT || 3000;
const app = next({ dev, port: typeof port === 'number' ? port : 3000 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${port}`);
  });
}).catch((err) => {
  console.error('Failed to prepare Next.js app:', err);
  process.exit(1);
});
