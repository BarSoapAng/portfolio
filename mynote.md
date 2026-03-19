# Getting Spotify Access token

```
https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played&state=spotify-player-test
```

```
$clientId = "ID"; $clientSecret = "SECRET"; $code="RESPONSE_FROM_PREV"; $redirectUri="http://127.0.0.1:3000/callback"; $basic=[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${clientId}:${clientSecret}")); Invoke-RestMethod -Method Post -Uri "https://accounts.spotify.com/api/token" -Headers @{ Authorization = "Basic $basic"; "Content-Type" = "application/x-www-form-urlencoded" } -Body @{ grant_type = "authorization_code"; code = $code; redirect_uri = $redirectUri } | ConvertTo-Json -Depth 5
```