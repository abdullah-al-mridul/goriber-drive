import { Router } from "express";
import path from "path";
import fs from "fs";
import env from "../keys/env";
import auth from "../middlewares/authMiddleware";
import busboy from "busboy";
import formatTimestamp from "../utils/formatTime";

const fileRouter = Router();

fileRouter.post("/upload", auth, (req: any, res: any) => {
  const bb = busboy({ headers: req.headers });

  const uploadDir = env.DATA_PATH;
  if (
    typeof uploadDir === "string" &&
    uploadDir.trim() !== "" &&
    fs.existsSync(uploadDir) &&
    fs.statSync(uploadDir).isDirectory()
  ) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    bb.on("file", (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(`File [${name}]: filename: %j`, filename);
      const ext = path.extname(filename);
      const base = path.basename(filename, ext);
      const timestamp = formatTimestamp();
      const finalName = `${base}-${timestamp}${ext}`;
      const saveTo = path.join(uploadDir, finalName);
      const writeStream = fs.createWriteStream(saveTo);

      file.pipe(writeStream);

      file.on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      });

      file.on("close", () => {
        console.log(`File [${name}] upload done → Saved to: ${saveTo}`);
      });
    });

    bb.on("field", (name, val) => {
      console.log(`Field [${name}]: ${val}`);
    });

    bb.on("close", () => {
      console.log("File upload finished");
      res.status(200).json({ message: "Upload complete." });
    });

    req.pipe(bb);
  } else {
    console.error(
      "DATA_PATH is not set or is not a string. If data path set then make sure it is a valid folder in that directory ."
    );
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default fileRouter;
