$postParams = '{"text": "tomaatti", "category": "Hevi"}';
Invoke-WebRequest -ContentType "application/json" -Uri http://localhost:4000/api/shoppinglist/items -Method PUT -Body $postParams