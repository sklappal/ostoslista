$postParams = '{"id":4}';
Invoke-WebRequest -ContentType "application/json" -Uri http://sklappal.kapsi.fi/ostoslista/api/shoppinglist/items -Method POST -Body $postParams