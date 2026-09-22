import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import archive from './data/archive.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'backrooms-archive', timestamp: new Date().toISOString() });
});

app.get('/api/archive', (_req, res) => {
  res.json(archive);
});

app.get('/api/:collection', (req, res) => {
  const collection = archive[req.params.collection];
  if (!Array.isArray(collection)) {
    return res.status(404).json({ error: 'Collection not found' });
  }

  const query = String(req.query.q || '').trim().toLowerCase();
  const results = query
    ? collection.filter((item) => JSON.stringify(item).toLowerCase().includes(query))
    : collection;

  res.json({ count: results.length, results });
});

app.get('/api/:collection/:id', (req, res) => {
  const collection = archive[req.params.collection];
  const item = Array.isArray(collection)
    ? collection.find((entry) => entry.id === req.params.id)
    : null;

  if (!item) return res.status(404).json({ error: 'Entry not found' });
  res.json(item);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Backrooms Archive running at http://localhost:${port}`);
});
