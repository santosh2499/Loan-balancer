// Random IP generator 
function generateRandomIP() { 
   return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join("."); 
} 

const loadBalancer = require("../services/loadBalancer");

// Simulate incoming traffic 
function simulateTraffic(requestCount = 10) { 
   for (let i = 0; i < requestCount; i++) { 
      const ip = generateRandomIP(); 
      loadBalancer(ip); 
   } 
} 

// Run simulation for 10 requests 
console.log("--- Starting Traffic Simulation ---");
simulateTraffic(10); 

// Test consistency
console.log("\n--- Consistency Test (Same IP same Node) ---");
const testIP = "192.168.1.50";
loadBalancer(testIP);
loadBalancer(testIP);
loadBalancer(testIP);