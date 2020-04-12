$response = Invoke-WebRequest -ContentType "application/json" -Uri http://localhost:4000/api/shoppinglist -Method GET

Write-Output $response.Content