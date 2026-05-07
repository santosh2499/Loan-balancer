const nodes = require("../config/nodes");

// In-memory rate limiting store
const rateLimitStore = {};
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

// Hash function - Simple consistent hash approach
function hashIP(ip) {
   let hash = 0;
   for (let i = 0; i < ip.length; i++) {
      hash = (hash * 31 + ip.charCodeAt(i)) >>> 0;
   }
   return hash;
}

// Identify which node received the request
function identifyNode(ip, selectedNode) {
   console.log(`Incoming IP: ${ip} → Routed to: ${selectedNode}`);
}

/**
 * Load Balancer with Consistent Hashing, Weighting, Health Checks, and Rate Limiting
 * @param {string} ip 
 */
function loadBalancer(ip) {
   // 1. Rate Limiting Logic
   const now = Date.now();
   if (!rateLimitStore[ip]) {
      rateLimitStore[ip] = { count: 1, firstRequest: now };
   } else {
      if (now - rateLimitStore[ip].firstRequest < RATE_LIMIT_WINDOW) {
         if (rateLimitStore[ip].count >= MAX_REQUESTS) {
            console.warn(`Rate limit exceeded for IP: ${ip}`);
            return "RATE_LIMITED";
         }
         rateLimitStore[ip].count++;
      } else {
         // Reset window
         rateLimitStore[ip] = { count: 1, firstRequest: now };
      }
   }

   // 2. Filter healthy nodes
   const activeNodes = nodes.filter(n => n.healthy);
   
   if (activeNodes.length === 0) {
      console.error("No healthy nodes available!");
      return null;
   }

   // 3. Weighted Consistent Hashing Logic
   // Build a "virtual ring" or list based on weights
   let weightedPool = [];
   activeNodes.forEach(node => {
      // Add node ID more times based on weight
      for (let i = 0; i < (node.weight || 1); i++) {
         weightedPool.push(node.id);
      }
   });

   const hash = hashIP(ip);
   const index = hash % weightedPool.length;
   const selectedNode = weightedPool[index];

   // 4. Keep this code to identify which node received the request
   identifyNode(ip, selectedNode);

   return selectedNode;
}

module.exports = loadBalancer;