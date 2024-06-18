source /home/codeblaz/nodevenv/linktree/20/bin/activate && cd /home/codeblaz/linktree
mongodb+srv://linktree_user:GHhLo58xB9nrOYgz@cluster0.nwgbk2x.mongodb.net/LinkTree?retryWrites=true&w=majority&appName=Cluster0


curl -X POST \
  http://localhost:3000/webhook/payment \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_id": "12345",
    "amount": 100.50,
    "status": "success"
}'



