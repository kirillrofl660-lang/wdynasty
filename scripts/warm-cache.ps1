param(
  [string]$Host = "https://wdynasty.ru",
  [string]$Token = $env:REVALIDATE_TOKEN
)

if (-not $Token) {
  Write-Error "Set REVALIDATE_TOKEN env var"
  exit 1
}

Write-Host "Warming cache at $Host ..."

$headers = @{
  "Content-Type" = "application/json"
  "Authorization" = "Bearer $Token"
}
$body = @{
  token = $Token
  paths = @("/", "/uslugi", "/cases", "/team", "/blog")
} | ConvertTo-Json -Depth 3

try {
  Invoke-RestMethod -Uri "$Host/api/revalidate" -Method POST -Headers $headers -Body $body | Out-Null
  Write-Host "Revalidation triggered."
} catch {
  Write-Error "Revalidation failed: $_"
  exit 1
}

foreach ($path in @("/", "/uslugi", "/cases", "/team", "/blog")) {
  Write-Host "Warming $path"
  try { Invoke-RestMethod -Uri "$Host$path" -Method GET | Out-Null } catch {}
  Start-Sleep -Seconds 2
}

Write-Host "Done."
