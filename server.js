const jsonServer = require('json-server');
const fetch = require('node-fetch');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

//  IMPORTANT: Define custom routes BEFORE json-server router
server.get('/api/quote', async (req, res) => {
  try {
    console.log(' Fetching quote from Quotable...');
    
    const response = await fetch('https://quotable.io/random');
    
    if (!response.ok) {
      throw new Error(`Quotable API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(' Quote received:', data.content);
    
    res.json({
      content: data.content,
      author: data.author
    });
    
  } catch (error) {
    console.error(' Quote API failed, using fallback:', error);
    
    const fallbackQuotes = [
      { content: "That which does not kill us makes us stronger.", author: "TaskZilla Team" },
      { content: "Fall seven times, stand up eight.", author: "TaskZilla Team" },
      { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
      { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" }
    ];
    
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json(randomQuote);
  }
});

//  JSON Server router must come AFTER custom routes
server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server with Quotes API is running');
  console.log(' Custom routes are defined before JSON Server router');
});