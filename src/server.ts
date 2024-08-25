import * as http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';


let server:http.Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    app.listen(config.PORT, () => {
      console.log(`App is listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection',()=>{
  console.log(`unhanledRajection is detecteted`);
  
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})


process.on('uncaughtException',()=>{
  console.log(`UncaughtException is detected, shutting down...`);
  process.exit(1)
  
})