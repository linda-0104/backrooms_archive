# Backrooms Archive

A small full-stack starter for the Backrooms Archive: Express serves the HTML/CSS frontend and a JSON API for levels, entities, and documents.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## API

- `GET /api/health`
- `GET /api/archive`
- `GET /api/levels?q=yellow`
- `GET /api/entities/:id`
- `GET /api/documents/:id`

Edit `data/archive.json` to add or update archive records.
