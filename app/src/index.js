const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>🚀 AWS DevOps Portfolio</h1>
        <p>Node.js app deployed on AWS EC2 with Terraform & Docker</p>
        <p>Built by <strong>Arlex</strong></p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
