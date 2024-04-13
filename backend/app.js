import express from "express";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const corseOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();
app.use(express.json());
app.use(cors(corseOptions));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const gallerySchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const openai = new OpenAI({
//   apiKey: "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",
// });

// app.post("/generate-image", async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const imageResponse = await openai.images.generate({
//       model: "dall-e-3",
//       n: 1,
//       prompt,
//       size: "1024x1024",
//     });
//     console(imageResponse.data.data[0].url);
//     res.json(imageResponse.data.data[0].url);
//   } catch (error) {
//     console.log(error);
//     res.json({ message: "Error generating image" });
//   }
// });

app.get("/generate-image", async (req, res) => {
  try {
    const response = await fetch(process.env.RANDOM_KEY);
    const data = await response.json();
    // data.message is the url for image generated
    console.log(data);

    const image = await cloudinary.uploader.upload(data.message, {
      public_id: "dog_image",
      folder: "ai-art",
    });

    const imageCreated = await Gallery.create({
      url: data.message,
      public_id: image.public_id,
    });

    res.json(imageCreated);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error generating image" });
  }
});

app.get("/images", async (req, res) => {
  const images = await Gallery.find();
  console.log(images);
  res.json(images);
});

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
