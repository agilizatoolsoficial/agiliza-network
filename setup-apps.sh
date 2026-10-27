#!/usr/bin/env bash
# setup-apps.sh — Orquestração do monorepo Agiliza Network (Linux/macOS)
#
# USO:
#   ./setup-apps.sh setup [--app=<nome>] [--force]
#   ./setup-apps.sh dev [--app=<nome>]
#   ./setup-apps.sh build [--app=<nome>]
#   ./setup-apps.sh clean [--all]
#   ./setup-apps.sh status
#   ./setup-apps.sh help

set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR"
APPS_DIR="$ROOT_DIR/apps"

# ─── Colors ───────────────────────────────────────────────────────────────────
if [ -t 1 ]; then
  C_RESET='\033[0m'
  C_CYAN='\033[0;36m'
  C_YELLOW='\033[0;33m'
  C_GREEN='\033[0;32m'
  C_RED='\033[0;31m'
  C_BOLD='\033[1m'
  C_DIM='\033[2m'
else
  C_RESET='' C_CYAN='' C_YELLOW='' C_GREEN='' C_RED='' C_BOLD='' C_DIM=''
fi

# ─── Helpers ─────────────────────────────────────────────────────────────────
header()  { echo -e "\n${C_CYAN}${C_BOLD}═══════════════════════════════════════${C_RESET}"; echo -e "${C_CYAN}${C_BOLD}  ⚡ Agiliza Network — $1${C_RESET}"; echo -e "${C_CYAN}${C_BOLD}═══════════════════════════════════════${C_RESET}"; }
step()    { echo -e "  ${C_YELLOW}→ $1${C_RESET}"; }
ok()      { echo -e "  ${C_GREEN}✅ $1${C_RESET}"; }
warn()    { echo -e "  ${C_YELLOW}⚠️  $1${C_RESET}"; }
err()     { echo -e "  ${C_RED}❌ $1${C_RESET}" >&2; }
info()    { echo -e "  ${C_DIM}$1${C_RESET}"; }

resolve_app_filter() {
  local app="$1"
  [ -z "$app" ] && echo "" && return
  [ "$app" = "web" ] && echo "web" && return
  [[ "$app" == agiliza-* ]] && echo "$app" && return
  echo "agiliza-$app"
}

get_package_name() {
  local app_id="$1"
  [ "$app_id" = "web" ] && echo "@agiliza/web" && return
  local slug="${app_id#agiliza-}"
  echo "@agiliza/$slug"
}

# ─── Parse arguments ─────────────────────────────────────────────────────────
ACTION="${1:-help}"
shift || true

APP_ARG=""
FORCE=false
CLEAN_ALL=false

for arg in "$@"; do
  case "$arg" in
    --app=*) APP_ARG="${arg#--app=}" ;;
    --force) FORCE=true ;;
    --all)   CLEAN_ALL=true ;;
    --*)     warn "Argumento desconhecido: $arg" ;;
  esac
done

# ─── Actions ─────────────────────────────────────────────────────────────────

do_setup() {
  header "Setup das Apps"

  local setup_script="$ROOT_DIR/scripts/setup-apps.js"
  local args=()

  [ -n "$APP_ARG" ]  && args+=("--app=$APP_ARG")
  [ "$FORCE" = true ] && args+=("--force")

  step "Executando scaffold (Node.js)..."
  node "$setup_script" "${args[@]}"

  echo ""
  ok "Scaffold concluído!"
  step "Instalando dependências..."
  npm install
  ok "npm install concluído!"
  echo ""
  echo -e "  ${C_CYAN}💡 Execute: ./setup-apps.sh dev --app=qr${C_RESET}"
  echo ""
}

do_dev() {
  header "Servidor de Desenvolvimento"

  local filter
  filter="$(resolve_app_filter "$APP_ARG")"

  if [ -n "$filter" ]; then
    local pkg
    pkg="$(get_package_name "$filter")"
    step "Iniciando $pkg..."
    npm run dev -- "--filter=$pkg"
  else
    step "Iniciando todas as apps..."
    npm run dev
  fi
}

do_build() {
  header "Build de Produção"

  local filter
  filter="$(resolve_app_filter "$APP_ARG")"

  if [ -n "$filter" ]; then
    local pkg
    pkg="$(get_package_name "$filter")"
    step "Build de $pkg..."
    npx turbo run build "--filter=$pkg"
  else
    step "Build de todas as apps..."
    npm run build
  fi
}

do_lint() {
  header "Lint"
  npm run lint
}

do_check_types() {
  header "Verificação de Tipos"
  npm run check-types
}

do_clean() {
  header "Limpeza do Monorepo"

  local args=()
  [ "$CLEAN_ALL" = true ] && args+=("--all")

  node "$ROOT_DIR/scripts/clean.js" "${args[@]}"

  if [ "$CLEAN_ALL" = true ]; then
    step "Reinstalando dependências..."
    npm install
  fi
}

do_status() {
  header "Status do Monorepo"

  local TOOL_APPS=(web agiliza-pdf agiliza-media agiliza-calc agiliza-qr agiliza-bio agiliza-nota agiliza-img agiliza-text agiliza-dev agiliza-sign)
  local PORTS=(3000 3001 3002 3003 3004 3005 3006 3007 3008 3009 3010)

  echo ""
  echo -e "  ${C_CYAN}${C_BOLD}📦 Apps configuradas:${C_RESET}"

  for i in "${!TOOL_APPS[@]}"; do
    local app="${TOOL_APPS[$i]}"
    local port="${PORTS[$i]}"
    local app_path="$APPS_DIR/$app"
    local pkg_name
    pkg_name="$(get_package_name "$app")"

    local has_pkg=false has_src=false has_built=false
    [ -f "$app_path/package.json" ] && has_pkg=true
    [ -d "$app_path/app" ]          && has_src=true
    [ -d "$app_path/.next" ]        && has_built=true

    local status_icon
    if $has_pkg && $has_src; then
      status_icon="${C_GREEN}✅${C_RESET}"
    elif [ -d "$app_path" ]; then
      status_icon="${C_YELLOW}⚠️ ${C_RESET}"
    else
      status_icon="${C_RED}❌${C_RESET}"
    fi

    local built_label=""
    $has_built && built_label=" ${C_DIM}[built]${C_RESET}"

    printf "  %b  %-24s :%-5s%b\n" "$status_icon" "$pkg_name" "$port" "$built_label"
  done

  echo ""
  echo -e "  ${C_CYAN}${C_BOLD}📁 Packages:${C_RESET}"
  local PACKAGES=(ui eslint-config typescript-config config-tailwind utils)
  for pkg in "${PACKAGES[@]}"; do
    local pkg_path="$ROOT_DIR/packages/$pkg"
    if [ -d "$pkg_path" ]; then
      echo -e "  ${C_GREEN}✅${C_RESET}  packages/$pkg"
    else
      echo -e "  ${C_RED}❌${C_RESET}  packages/$pkg"
    fi
  done

  echo ""
  info "Node.js: $(node --version 2>/dev/null || echo 'não encontrado')"
  info "npm:     $(npm --version 2>/dev/null || echo 'não encontrado')"
  info "turbo:   $(npx turbo --version 2>/dev/null || echo 'não encontrado')"
  echo ""
}

do_help() {
  header "Ajuda"
  cat << 'EOF'

  USAGE:
    ./setup-apps.sh <ação> [opções]

  AÇÕES:
    setup         Cria o scaffold das apps (Node.js)
    dev           Inicia o servidor de desenvolvimento
    build         Executa o build de produção
    lint          Executa o linter
    check-types   Verifica tipos TypeScript
    clean         Limpa artefatos de build (.next, dist, .turbo)
    status        Exibe o status de todas as apps
    help          Exibe esta mensagem

  OPÇÕES:
    --app=<nome>  Filtra para uma app específica
                  Valores: web | pdf | media | calc | qr | bio | nota | img | text | dev | sign
    --force       Sobrescreve arquivos existentes no scaffold
    --all         (clean) Inclui node_modules na limpeza

  EXEMPLOS:
    ./setup-apps.sh setup                    # Scaffold de todas as apps
    ./setup-apps.sh setup --app=qr           # Scaffold só do AgilizaQR
    ./setup-apps.sh setup --force            # Força sobrescrever arquivos
    ./setup-apps.sh dev --app=qr             # Dev server do AgilizaQR
    ./setup-apps.sh dev                      # Dev server de todas
    ./setup-apps.sh build --app=pdf          # Build do AgilizaPDF
    ./setup-apps.sh clean                    # Limpa builds
    ./setup-apps.sh clean --all              # Limpa tudo + node_modules
    ./setup-apps.sh status                   # Status das apps

EOF
}

# ─── Dispatch ────────────────────────────────────────────────────────────────
cd "$ROOT_DIR"

case "$ACTION" in
  setup)       do_setup ;;
  dev)         do_dev ;;
  build)       do_build ;;
  lint)        do_lint ;;
  check-types) do_check_types ;;
  clean)       do_clean ;;
  status)      do_status ;;
  help|--help|-h) do_help ;;
  *)
    err "Ação desconhecida: $ACTION"
    do_help
    exit 1
    ;;
esac
