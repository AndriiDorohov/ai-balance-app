export const getNFTsForAddress = async (address) => {
  const API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
  const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}/getNFTs/?owner=${address}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.ownedNfts || [];
  } catch (err) {
    console.error("Failed to fetch NFTs", err);
    return [];
  }
};
