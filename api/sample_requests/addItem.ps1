$postParams = '{"text": "tomaatti", "category": "Hevi"}';
$res = Invoke-WebRequest -ContentType "application/json" -Uri http://sklappal.kapsi.fi/ostoslista/api/shoppinglist/items/add -Method POST -Body $postParams

Write-Output $res