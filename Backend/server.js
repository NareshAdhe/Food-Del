import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;


//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

//DB Connection
connectDB();

//api endpoints
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.listen(port, () => {
    console.log(`Server Started On http://localhost:${port}`);
})