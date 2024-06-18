import "reflect-metadata";
import { AppDataSource } from "./data-source"
import { authRoutes } from "./routes";
import express = require("express");
import cors = require('cors');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

(async () => {
    try {
      const dataSource = AppDataSource;
      console.log('Connected to database');
  
      app.use('/api/account', authRoutes);
  
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error connecting to database:', error);
      process.exit(1); // Exit with failure code
    }
  })();
  