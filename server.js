import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import archive from './data/archive.json' with { type: 'json' };

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/archive', (_req, res) => res.json(archive));
app.get('/api/:collection', (req, res) => {
  const items = archive[req.params.collection];
  if (!Array.isArray(items)) return res.status(404).json({ error: 'Collection not found' });
  const q = String(req.query.q || '').toLowerCase();
  res.json(items.filter(item => JSON.stringify(item).toLowerCase().includes(q)));
});
app.get('/api/:collection/:id', (req, res) => {
  const item = archive[req.params.collection]?.find(entry => entry.id === req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'Entry not found' });
});
app.listen(port, () => console.log(`Running at http://localhost:${port}`));
