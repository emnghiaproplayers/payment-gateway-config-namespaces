#!/usr/bin/env bash

# Smoke test commands for local development verification

echo "============================================="
echo "1. GET /payments/config (Development Mode)"
echo "============================================="
curl -X GET http://localhost:3000/payments/config
echo -e "\n"

echo "============================================="
echo "2. POST /payments/charge (Development Mode)"
echo "============================================="
curl -X POST http://localhost:3000/payments/charge \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORD-001","amount":120000}'
echo -e "\n"

echo "============================================="
echo "3. GET /payments/config (Production Mode)"
echo "============================================="
curl -X GET http://localhost:8080/payments/config
echo -e "\n"

echo "============================================="
echo "4. POST /payments/charge (Production Mode)"
echo "============================================="
curl -X POST http://localhost:8080/payments/charge \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORD-PROD-001","amount":250000}'
echo -e "\n"
