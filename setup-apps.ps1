<#
.SYNOPSIS
  Orquestracao do monorepo Agiliza Network (Windows/PowerShell)
.PARAMETER Action
  setup | dev | build | lint | check-types | clean | status | help
.PARAMETER App
  pdf | media | calc | qr | bio | nota | img | text | dev | sign | web
.PARAMETER Force
  Sobrescreve arquivos existentes no scaffold
.PARAMETER CleanAll
  Inclui node_modules na limpeza
.EXAMPLE
  .\setup-apps.ps1 -Action status
  .\setup-apps.ps1 -Action setup -App qr
  .\setup-apps.ps1 -Action dev -App qr
#>

param(
  [ValidateSet('setup','dev','build','lint','check-types','clean','status','help')]
  [string]$Action = 'help',
  [string]$App = '',
  [switch]$Force,
  [switch]$CleanAll
)

# ─── Config ───────────────────────────────────────────────────────────────────
$ScriptRoot = $PSScriptRoot
$RootDir    = if (Test-Path (Join-Path $ScriptRoot 'package.json')) { $ScriptRoot } else { Split-Path $ScriptRoot -Parent }
$AppsDir    = Join-Path $RootDir 'apps'

$ALL_APPS = @(
  [pscustomobject]@{ Id='web';           Port=3000 }
  [pscustomobject]@{ Id='agiliza-pdf';   Port=3001 }
  [pscustomobject]@{ Id='agiliza-media'; Port=3002 }
  [pscustomobject]@{ Id='agiliza-calc';  Port=3003 }
  [pscustomobject]@{ Id='agiliza-qr';    Port=3004 }
  [pscustomobject]@{ Id='agiliza-bio';   Port=3005 }
  [pscustomobject]@{ Id='agiliza-nota';  Port=3006 }
  [pscustomobject]@{ Id='agiliza-img';   Port=3007 }
  [pscustomobject]@{ Id='agiliza-text';  Port=3008 }
  [pscustomobject]@{ Id='agiliza-dev';   Port=3009 }
  [pscustomobject]@{ Id='agiliza-sign';  Port=3010 }
)

# ─── Helpers ─────────────────────────────────────────────────────────────────
function Write-AgilizaHeader([string]$title) {
  Write-Host ""
  Write-Host ("=" * 50) -ForegroundColor DarkCyan
  Write-Host "  >> Agiliza Network -- $title" -ForegroundColor Cyan
  Write-Host ("=" * 50) -ForegroundColor DarkCyan
}

function Resolve-AgilizaFilter([string]$name) {
  if ([string]::IsNullOrEmpty($name)) { return "" }
  if ($name -eq 'web') { return 'web' }
  if ($name -like 'agiliza-*') { return $name }
  return "agiliza-$name"
}

function Get-AgilizaPkg([string]$appId) {
  if ($appId -eq 'web') { return '@agiliza/web' }
  $slug = $appId -replace '^agiliza-', ''
  return "@agiliza/$slug"
}

# ─── Action: setup ───────────────────────────────────────────────────────────
function Exec-Setup {
  Write-AgilizaHeader "Setup das Apps"
  $script = Join-Path $RootDir 'scripts\setup-apps.js'
  $nodeArgs = [System.Collections.Generic.List[string]]::new()
  $nodeArgs.Add($script)
  if (-not [string]::IsNullOrEmpty($App)) { $nodeArgs.Add("--app=$App") }
  if ($Force) { $nodeArgs.Add('--force') }

  Push-Location $RootDir
  try {
    Write-Host "  -> Scaffolding apps..." -ForegroundColor Yellow
    & node @nodeArgs
    if ($LASTEXITCODE -ne 0) { Write-Host "  [ERRO] Scaffold falhou" -ForegroundColor Red; return }
    Write-Host "  [OK] Scaffold concluido" -ForegroundColor Green
    Write-Host "  -> Instalando dependencias..." -ForegroundColor Yellow
    & npm install
    if ($LASTEXITCODE -eq 0) {
      Write-Host "  [OK] npm install concluido" -ForegroundColor Green
      Write-Host ""
      Write-Host "  Proximo passo: .\setup-apps.ps1 -Action dev -App qr" -ForegroundColor Cyan
    } else {
      Write-Host "  [ERRO] npm install falhou" -ForegroundColor Red
    }
  } finally { Pop-Location }
}

# ─── Action: dev ─────────────────────────────────────────────────────────────
function Exec-Dev {
  Write-AgilizaHeader "Servidor de Desenvolvimento"
  $filter = Resolve-AgilizaFilter $App
  Push-Location $RootDir
  try {
    if (-not [string]::IsNullOrEmpty($filter)) {
      $pkg = Get-AgilizaPkg $filter
      Write-Host "  -> Iniciando $pkg (porta via package.json)..." -ForegroundColor Yellow
      & npm run dev -- "--filter=$pkg"
    } else {
      Write-Host "  -> Iniciando todas as apps..." -ForegroundColor Yellow
      & npm run dev
    }
  } finally { Pop-Location }
}

# ─── Action: build ───────────────────────────────────────────────────────────
function Exec-Build {
  Write-AgilizaHeader "Build de Producao"
  $filter = Resolve-AgilizaFilter $App
  Push-Location $RootDir
  try {
    if (-not [string]::IsNullOrEmpty($filter)) {
      $pkg = Get-AgilizaPkg $filter
      Write-Host "  -> Build de $pkg..." -ForegroundColor Yellow
      & npx turbo run build "--filter=$pkg"
    } else {
      Write-Host "  -> Build de todas as apps..." -ForegroundColor Yellow
      & npm run build
    }
  } finally { Pop-Location }
}

# ─── Action: lint ────────────────────────────────────────────────────────────
function Exec-Lint {
  Write-AgilizaHeader "Lint"
  Push-Location $RootDir
  try { & npm run lint } finally { Pop-Location }
}

# ─── Action: check-types ─────────────────────────────────────────────────────
function Exec-CheckTypes {
  Write-AgilizaHeader "Verificacao de Tipos"
  Push-Location $RootDir
  try { & npm run check-types } finally { Pop-Location }
}

# ─── Action: clean ───────────────────────────────────────────────────────────
function Exec-Clean {
  Write-AgilizaHeader "Limpeza do Monorepo"
  $cleanScript = Join-Path $RootDir 'scripts\clean.js'
  $nodeArgs = [System.Collections.Generic.List[string]]::new()
  $nodeArgs.Add($cleanScript)
  if ($CleanAll) { $nodeArgs.Add('--all') }
  Push-Location $RootDir
  try {
    & node @nodeArgs
    if ($LASTEXITCODE -eq 0 -and $CleanAll) {
      Write-Host "  -> Reinstalando dependencias..." -ForegroundColor Yellow
      & npm install
    }
  } finally { Pop-Location }
}

# ─── Action: status ──────────────────────────────────────────────────────────
function Exec-Status {
  Write-AgilizaHeader "Status do Monorepo"
  Write-Host ""
  Write-Host "  Apps:" -ForegroundColor Cyan

  foreach ($app in $ALL_APPS) {
    $appPath  = Join-Path $AppsDir $app.Id
    $hasPkg   = Test-Path (Join-Path $appPath 'package.json')
    $hasSrc   = Test-Path (Join-Path $appPath 'app')
    $hasBuilt = Test-Path (Join-Path $appPath '.next')
    $pkgName  = Get-AgilizaPkg $app.Id

    if ($hasPkg -and $hasSrc) { $icon = '[OK]  ' }
    elseif (Test-Path $appPath) { $icon = '[WARN] ' }
    else { $icon = '[MISS] ' }

    $builtTag = if ($hasBuilt) { ' [built]' } else { '' }
    Write-Host ("  {0}  {1,-24} :{2}{3}" -f $icon, $pkgName, $app.Port, $builtTag)
  }

  Write-Host ""
  Write-Host "  Packages:" -ForegroundColor Cyan
  foreach ($pkg in @('ui','eslint-config','typescript-config','config-tailwind','utils')) {
    $exists = Test-Path (Join-Path $RootDir "packages\$pkg")
    $icon   = if ($exists) { '[OK]' } else { '[MISS]' }
    Write-Host "  $icon  packages/$pkg"
  }

  Write-Host ""
  Write-Host ("  Node.js : {0}" -f (node --version)) -ForegroundColor DarkGray
  Write-Host ("  npm     : {0}" -f (npm --version))  -ForegroundColor DarkGray
  $tv = (npx turbo --version 2>$null)
  Write-Host ("  turbo   : {0}" -f $tv) -ForegroundColor DarkGray
  Write-Host ""
}

# ─── Action: help ────────────────────────────────────────────────────────────
function Exec-Help {
  Write-AgilizaHeader "Ajuda"
  Write-Host @"

  USO:
    .\setup-apps.ps1 -Action <acao> [-App <app>] [-Force] [-CleanAll]

  ACOES:
    setup        Cria scaffold de todas as apps (ou uma com -App)
    dev          Inicia o servidor de desenvolvimento
    build        Executa o build de producao
    lint         Executa o linter
    check-types  Verifica tipos TypeScript
    clean        Limpa .next, dist, .turbo
    status       Exibe status de todas as apps
    help         Exibe esta mensagem

  APPS: web | pdf | media | calc | qr | bio | nota | img | text | dev | sign

  EXEMPLOS:
    .\setup-apps.ps1 -Action setup
    .\setup-apps.ps1 -Action setup -App qr
    .\setup-apps.ps1 -Action setup -Force
    .\setup-apps.ps1 -Action dev -App qr
    .\setup-apps.ps1 -Action build -App pdf
    .\setup-apps.ps1 -Action clean
    .\setup-apps.ps1 -Action clean -CleanAll
    .\setup-apps.ps1 -Action status

"@
}

# ─── Dispatch ────────────────────────────────────────────────────────────────
switch ($Action) {
  'setup'       { Exec-Setup }
  'dev'         { Exec-Dev }
  'build'       { Exec-Build }
  'lint'        { Exec-Lint }
  'check-types' { Exec-CheckTypes }
  'clean'       { Exec-Clean }
  'status'      { Exec-Status }
  default       { Exec-Help }
}
