const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { RecipeController } = require('./controllers/recipe.controller');
const { RecipesController } = require('./controllers/recipes.controller');
const sls = require('serverless-http');

dotenv.config();
// console.log(`env set: ${process.env.apiKey}, ${process.env.apiId}`);
const app = express();

const PORT = 8080;
const corsOption = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    // const host = origin.split('://')[1]
    // const allowedHost = ['localhost:3000']
    // const allowed = allowedHost.includes(host)
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  return res.status(200).send('server healthy');
});

app.post('/recipes', (req, res) => {
  return RecipesController(req, res);
});

app.get('/recipe/:recipeId', (req, res) => {
  return RecipeController(req, res);
});

app.get('/', (req, res) => {
  return res.status(200).send('server healthy');
});

app.listen(PORT, () => {
  console.log(`app running in port: ${PORT}`);
});

module.exports.server = sls(app);
