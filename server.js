import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:1420",
  },
});

const availablePincodes = ["1234", "4321", "1111"];
app.post("/validate-pincode", async (req, res) => {
  const { pincode } = req.body;
  try {
    const foundPincode = availablePincodes.find((item) => item === pincode);
    if (foundPincode) {
      res.status(200).send({ status: "Authorized" });
    } else {
      res.status(200).send({ status: "Failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  const randomDelay = Math.floor(Math.random() * 9000) + 1000;
  setTimeout(() => {
    const failedMotortimer = Math.ceil(Math.random() * 10);
    const motorFailureMessage = `Motor ${failedMotortimer} failed.`;
    socket.emit("motorFailure", motorFailureMessage);
  }, randomDelay);
});

httpServer.listen(8080, () => {
  console.log("Listening to server on http://localhost:8080/");
});
