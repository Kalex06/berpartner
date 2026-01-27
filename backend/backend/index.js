require('dotenv').config(); 
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3000;




const user_router = require('./routes/user.routes');
const auth_router = require('./routes/auth.routes');

app.use(cors());
app.use(express.json());

app.use('/users', user_router);
app.use('/auth', auth_router);


app.listen(PORT,()=>{

    console.log(`A szerver fut itt: http://localhost:${PORT}`)

})