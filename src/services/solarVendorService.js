/**
 * Solar Vendor Data Service
 * Fetches vendor data from remote source with local caching
 * Falls back to embedded data if fetch fails
 */

// Fallback vendor data from local engine
import { SOLAR_MERCHANTS } from "../engine/solarMerchants.js";

// Flatten merchant packages into a single array for fallback
const fallbackVendors = SOLAR_MERCHANTS.flatMap(merchant => 
  merchant.packages.map(pkg => ({
    ...pkg,
    merchantName: merchant.name,
    merchantTagline: merchant.tagline,
    merchantWebsite: merchant.website,
    merchantPhone: merchant.phone,
    merchantEmail: merchant.email,
  }))
);

// Configuration
const CONFIG = {
  // Primary data source - can be updated to your own API endpoint
  DATA_URL: "https://api.ecoaudit.ng/vendors.json",
  
  // Cache settings
  CACHE_KEY: "ecoaudit_solar_vendors_v1",
  CACHE_TIMESTAMP_KEY: "ecoaudit_solar_vendors_timestamp",
  CACHE_TTL: 24 * 60 * 60 * 1000, // 24 hours
  
  // Retry settings
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000, // 1 second
};

/**
 * Fetch vendors from remote source with retry logic
 */
async function fetchRemoteVendors() {
  let lastError;
  
  for (let attempt = 0; attempt < CONFIG.MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
      
      const response = await fetch(CONFIG.DATA_URL, {
        signal: controller.signal,
        headers: {
          "Accept": "application/json",
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid data format: expected non-empty array");
      }
      
      // Validate required fields on first item
      const requiredFields = ["id", "name", "merchantName", "totalPrice", "systemKw"];
      const firstItem = data[0];
      const missingFields = requiredFields.filter(f => !(f in firstItem));
      
      if (missingFields.length > 0) {
        throw new Error(`Invalid data: missing fields ${missingFields.join(", ")}`);
      }
      
      return data;
      
    } catch (error) {
      lastError = error;
      
      if (attempt < CONFIG.MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY * (attempt + 1)));
      }
    }
  }
  
  throw lastError;
}

/**
 * Get cached vendors from localStorage
 */
function getCachedVendors() {
  try {
    const cached = localStorage.getItem(CONFIG.CACHE_KEY);
    const timestamp = localStorage.getItem(CONFIG.CACHE_TIMESTAMP_KEY);
    
    if (!cached || !timestamp) return null;
    
    const age = Date.now() - parseInt(timestamp, 10);
    
    // Check if cache is still valid
    if (age > CONFIG.CACHE_TTL) {
      return null;
    }
    
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

/**
 * Save vendors to localStorage cache
 */
function cacheVendors(vendors) {
  try {
    localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify(vendors));
    localStorage.setItem(CONFIG.CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.warn("Failed to cache vendors:", error);
  }
}

/**
 * Clear the vendor cache
 */
export function clearVendorCache() {
  try {
    localStorage.removeItem(CONFIG.CACHE_KEY);
    localStorage.removeItem(CONFIG.CACHE_TIMESTAMP_KEY);
  } catch (error) {
    console.warn("Failed to clear vendor cache:", error);
  }
}

/**
 * Get solar vendors with caching
 * Returns cached data immediately if available, then fetches fresh data in background
 */
export async function getSolarVendors(options = {}) {
  const { forceRefresh = false, preferCache = false } = options;
  
  // Check for cached data
  const cached = !forceRefresh ? getCachedVendors() : null;
  
  // If we have valid cache and preferCache is true, return it immediately
  if (cached && preferCache) {
    // Still try to refresh in background
    refreshVendorsInBackground().catch(() => {});
    return cached;
  }
  
  // Try to fetch fresh data
  try {
    const vendors = await fetchRemoteVendors();
    cacheVendors(vendors);
    return vendors;
  } catch (error) {
    console.warn("Failed to fetch remote vendors:", error.message);
    
    // Return cached data if available (even if expired)
    if (cached) {
      console.log("Using cached vendor data");
      return cached;
    }
    
    // Fall back to embedded data
    console.log("Using fallback vendor data");
    return fallbackVendors;
  }
}

/**
 * Refresh vendors in background without blocking
 */
async function refreshVendorsInBackground() {
  try {
    const vendors = await fetchRemoteVendors();
    cacheVendors(vendors);
  } catch {
    // Silently fail - we already have cached data
  }
}

/**
 * Check if cache is stale (older than TTL)
 */
export function isCacheStale() {
  const timestamp = localStorage.getItem(CONFIG.CACHE_TIMESTAMP_KEY);
  if (!timestamp) return true;
  
  const age = Date.now() - parseInt(timestamp, 10);
  return age > CONFIG.CACHE_TTL;
}

/**
 * Get cache age in hours
 */
export function getCacheAge() {
  const timestamp = localStorage.getItem(CONFIG.CACHE_TIMESTAMP_KEY);
  if (!timestamp) return null;
  
  const age = Date.now() - parseInt(timestamp, 10);
  return Math.round(age / (60 * 60 * 1000) * 10) / 10;
}

/**
 * Get vendor by ID
 */
export async function getVendorById(id) {
  const vendors = await getSolarVendors();
  return vendors.find(v => v.id === id) || null;
}

/**
 * Search vendors by name or merchant
 */
export async function searchVendors(query) {
  const vendors = await getSolarVendors();
  const lowerQuery = query.toLowerCase();
  
  return vendors.filter(v => 
    v.name.toLowerCase().includes(lowerQuery) ||
    v.merchantName.toLowerCase().includes(lowerQuery) ||
    v.description?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get price range of available vendors
 */
export async function getPriceRange() {
  const vendors = await getSolarVendors();
  
  if (vendors.length === 0) return null;
  
  const prices = vendors.map(v => v.totalPrice);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    median: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)],
  };
}
