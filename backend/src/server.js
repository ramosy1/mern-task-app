const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('../routes/user-routes');
const routes = require('../routes/todo-routes');

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Backend is running");
});

app.use(morgan('tiny'));
app.use('/auth', userRouter);
app.use(routes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true    
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log("Server Connected"));