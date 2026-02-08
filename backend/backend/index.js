require('dotenv').config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 3000;




const user_router = require('./routes/user.routes');
const auth_router = require('./routes/auth.routes');
const item_router = require('./routes/item.routes');

app.use(cors());
app.use(express.json());

app.use('/user', user_router);
app.use('/auth', auth_router);
app.use('/item',item_router);
app.use('/upload/picture',express.static(path.join(__dirname,'upload','items_picture')));
app.listen(PORT,()=>{

    console.log(`A szerver fut itt: http://localhost:${PORT}`)

})