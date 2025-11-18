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
      { content: "Don't watch the clock; do what it does. Keep going.", author: "TaskZilla Team" },
      { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { content: "Keep pushing forward, no matter what.", author: "TaskZilla Team" },
      { content: "That which does not kill us makes us stronger.", author: "TaskZilla Team" },
      { content: "Fall seven times, stand up eight.", author: "TaskZilla Team" },
      { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
      { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
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