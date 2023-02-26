import cors from "cors";
import express from "express";
import appConfig from "./2-utils/appConfig";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import expressFileUpload from "express-fileupload"
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import authRoutes from "./6-routes/auth-routes";
import vacationRoutes from "./6-routes/vacation-routes"
const server = express();
server.use(expressRateLimit({
    windowMs: 5000,
    max: 20,
    message: "Are you a hacker?"
}));
server.use(helmet({
    crossOriginResourcePolicy: false,
}));
server.use(cors());

server.use(express.json());
server.use(expressFileUpload())

server.use("/api", authRoutes)
server.use("/api", vacationRoutes)

server.use("*", routeNotFound);
server.use(catchAll);


server.listen(appConfig.port, () => console.log(`listening to http://localhost:${appConfig.port}`)
)
