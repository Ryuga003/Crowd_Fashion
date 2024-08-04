import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import UserRoutes from "./routes/user.js"
import QueryRoutes from "./routes/query.js"
import CommentRoutes from "./routes/comment.js"
import MessageRoutes from "./routes/message.js"
// import Query from "./models/query.js";
// import { faker } from "@faker-js/faker"
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/user", UserRoutes)
app.use("/query", QueryRoutes)
app.use("/comment", CommentRoutes)
app.use("/message", MessageRoutes)
app.use(errorMiddleware)

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING AT ${PORT}`)
    })
}).catch(err => console.log(err));

// const generateFakeData = async () => {
//     try {
//         const fakeQueries = [];

//         for (let i = 0; i < 30; i++) {
//             const fakeQuery = new Query({
//                 title: faker.lorem.sentence(),
//                 description: faker.lorem.paragraphs(2),
//                 coverImage: faker.image.imageUrl(),
//                 createdBy: "664c24e5b2a687dbcb6b7938",
//             });
//             fakeQueries.push(fakeQuery);
//         }

//         await Query.insertMany(fakeQueries);
//         console.log('Fake data inserted successfully');
//     } catch (error) {
//         console.error('Error generating fake data:', error);
//     }
// };

// generateFakeData();