$postParams = '{"id":4}';
Invoke-WebRequest -ContentType "application/json" -Uri http://localhost:4000/api/shoppinglist/boughtItems -Method POST -Body $postParams