import type { VercelRequest, VercelResponse } from '@vercel/node';

// Gold price API service
async function fetchGoldPrice() {
  const METAL_PRICE_API_KEY = process.env.METAL_PRICE_API_KEY;
  
  try {
    if (METAL_PRICE_API_KEY) {
      // Try paid API first
      const response = await fetch(
        `https://api.metalpriceapi.com/v1/latest?api_key=${METAL_PRICE_API_KEY}&base=USD&currencies=XAU`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.rates?.XAU) {
          const ozPrice = 1 / data.rates.XAU;
          const gramPrice = ozPrice / 31.1035;
          
          return {
            spotPrice: Math.round(ozPrice * 100) / 100,
            pricePerGram: Math.round(gramPrice * 100) / 100,
            lastUpdated: new Date().toISOString(),
            market: "Live Market"
          };
        }
      }
    }
    
    // Fallback to free API
    const freeResponse = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
    if (freeResponse.ok) {
      const data = await freeResponse.json();
      const ozPrice = parseFloat(data.items[0].xauPrice);
      const gramPrice = ozPrice / 31.1035;
      
      return {
        spotPrice: Math.round(ozPrice * 100) / 100,
        pricePerGram: Math.round(gramPrice * 100) / 100,
        lastUpdated: new Date().toISOString(),
        market: "Live Market"
      };
    }
    
    // Ultimate fallback
    return {
      spotPrice: 3760.69,
      pricePerGram: 120.91,
      lastUpdated: new Date().toISOString(),
      market: "Fallback Data"
    };
  } catch (error) {
    console.error('Gold price fetch error:', error);
    return {
      spotPrice: 3760.69,
      pricePerGram: 120.91,
      lastUpdated: new Date().toISOString(),
      market: "Fallback Data"
    };
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const goldPrice = await fetchGoldPrice();
    res.status(200).json(goldPrice);
  } catch (error) {
    console.error('Error in gold-price handler:', error);
    res.status(500).json({ error: 'Failed to fetch gold price' });
  }
}
