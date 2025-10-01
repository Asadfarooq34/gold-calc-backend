# Gold Calculator Backend - Vercel Deployment

## Backend API for Gold Calculator

This is a serverless backend deployed on Vercel that provides gold price data.

### API Endpoints

- `/api/gold-price` - Returns current gold prices
- `/api/config` - Returns API configuration

### Environment Variables

Optional:
- `METAL_PRICE_API_KEY` - For premium gold price API access

### Local Development

```bash
npm install
npm run dev
```

### Deployment

```bash
vercel
```
