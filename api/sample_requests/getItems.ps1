$response = Invoke-WebRequest -ContentType "application/json" -Uri http://sklappal.kapsi.fi/ostoslista/api/shoppinglist -Method GET

Write-Output $response.Content