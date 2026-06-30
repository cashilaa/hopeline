import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting production server...');
console.log('Environment check:');
console.log('PORT:', process.env.PORT || 3000);
console.log('R2_ACCOUNT_ID:', process.env.R2_ACCOUNT_ID ? '✓' : '✗');
console.log('R2_BUCKET_NAME:', process.env.R2_BUCKET_NAME ? '✓' : '✗');
console.log('R2_ACCESS_KEY_ID:', process.env.R2_ACCESS_KEY_ID ? '✓' : '✗');
console.log('R2_SECRET_ACCESS_KEY:', process.env.R2_SECRET_ACCESS_KEY ? '✓' : '✗');
console.log('R2_PUBLIC_URL:', process.env.R2_PUBLIC_URL ? '✓' : '✗');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

try {
  const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  console.log('R2 client initialized successfully');

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  // Serve static files from dist
  app.use(express.static(path.join(__dirname, 'dist')));
  console.log('Static files served from:', path.join(__dirname, 'dist'));

  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      const folder = req.body.folder || "uploads";
      const ext = path.extname(file.originalname);
      const key = `${folder}/${randomUUID()}${ext}`;

      await r2.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
      res.json({ url: publicUrl });
    } catch (err) {
      console.error("R2 upload error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Serve React app for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✓ Server running successfully on port ${PORT}`);
    console.log(`✓ Static files: ${path.join(__dirname, 'dist')}`);
    console.log(`✓ Upload endpoint: /api/upload`);
  });

} catch (error) {
  console.error('Failed to initialize server:', error);
  process.exit(1);
}