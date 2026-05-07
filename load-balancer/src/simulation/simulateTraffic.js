// Given Code

function generateRandomIP() {
   return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");
}

const loadBalancer = require("../services/loadBalancer");

// Keep identifyNode here (as required)
function identifyNode(ip, selectedNode) {
   const time = new Date().toISOString();
   console.log(`[${time}] Incoming IP: ${ip} → Routed to: ${selectedNode}`);
}

// Simulate traffic
function simulateTraffic(requestCount = 10) {
   for (let i = 0; i < requestCount; i++) {
       const ip = generateRandomIP();
       loadBalancer(ip, identifyNode); // pass function
   }
}

// Run
simulateTraffic();

// Test consistency
console.log("\n--- Consistency Test ---");
loadBalancer("192.168.1.10", identifyNode);
loadBalancer("192.168.1.10", identifyNode);