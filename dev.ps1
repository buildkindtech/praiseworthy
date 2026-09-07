$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeDir = Join-Path $projectRoot ".tools\node-v20.19.0-win-x64"
$npmCmd = Join-Path $nodeDir "npm.cmd"

if (-not (Test-Path $npmCmd)) {
    Write-Error "Local Node 20 was not found at $nodeDir. Restore the .tools folder or download Node 20 again."
}

$env:Path = "$nodeDir;$env:Path"
Set-Location $projectRoot

& $npmCmd run dev
