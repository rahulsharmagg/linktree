curl -X POST \
  http://localhost:3000/webhook/payment \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_id": "12345",
    "amount": 100.50,
    "status": "success"
}'
