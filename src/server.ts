import mongoose from 'mongoose';
import app from './app'

console.log(process.env.CONN_STR);

mongoose.connect(process.env.CONN_STR!).then(()=>{
    console.log("conntected");
    
})

const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log("server started");
})