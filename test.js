import { CoinGeckoClient } from 'coingecko-api-v3';

async function fetchTrending() {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  
  const trendingSearch = await client.trending();
  console.log(trendingSearch);
}

fetchTrending();