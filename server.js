// Simple Express server for Render deployment
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// In-memory storage for reports (in production, use a database)
let reports = [
  {
    "id": "1",
    "childName": "Sample Child",
    "age": 8,
    "gender": "Male",
    "lastSeenLocation": "Nairobi CBD",
    "dateMissing": "2024-01-15",
    "description": "Sample description for testing",
    "reporterName": "John Doe",
    "reporterContact": "+254700000000",
    "reporterEmail": "john@example.com",
    "status": "resolved",
    "dateReported": "2024-01-16T10:30:00.000Z"
  }
];

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

app.post('/api/reports', (req, res) => {
  try {
    const newReport = {
      id: Math.random().toString(36).substr(2, 9),
      ...req.body,
      status: 'pending',
      dateReported: new Date().toISOString()
    };
    
    reports.push(newReport);
    console.log('New report created:', newReport.id);
    
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Failed to create report' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    reports_count: reports.length 
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});