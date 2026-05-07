# Load Balancer Simulation (Infollion Task)

## Overview
A redesigned load balancer implementing consistent hashing techniques to ensure IP stickiness, along with advanced features like weighted routing, health checks, and rate limiting.

## Features
- **Consistent Hashing**: IP addresses are deterministically routed to the same node.
- **Weighted Routing**: Higher weight nodes receive more traffic.
- **Health Checks**: Only healthy nodes receive traffic.
- **Rate Limiting**: Limits requests per IP (5 requests/minute).
- **Traffic Simulation**: CLI tool to demonstrate the logic.
- **API Access**: Express.js REST endpoint for routing requests.

## Tech Stack
- Node.js
- Express.js

## How to Run
1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run Traffic Simulation (CLI)**
   ```bash
   npm run simulate
   ```
3. **Run Web Server**
   ```bash
   npm start
   ```
4. **Test API**
   - Access via browser or Postman: `http://localhost:3000/api/route?ip=123.123.123.123`

## Implementation Details
- **Consistent Mapping**: Uses a custom hashing function `hashIP` and a weighted pool to ensure an IP consistently maps to a node.
- **In-Memory Store**: Rate limiting and health states are managed in-memory as per constraints.
