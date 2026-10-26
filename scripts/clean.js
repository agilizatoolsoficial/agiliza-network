#!/usr/bin/env node
/**
 * clean.js — Script de sanitização do monorepo Agiliza Network
 * Uso: node scripts/clean.js [--turbo-only] [--all]
 *
 * --turbo-only  → apenas remove .turbo (mais rápido)
 * --all         → remove também node_modules (reinstall necessário)
 * (padrão)      → remove .next, dist, .turbo
 */

import { rmSync, existsSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')

const args = process.argv.slice(2)
const TURBO_ONLY = args.includes('--turbo-only')
const CLEAN_ALL = args.includes('--all')

// ─── Targets ────────────────────────────────────────────────────────────────
const ALWAYS_CLEAN = ['.turbo']
const BUILD_ARTIFACTS = ['.next', 'dist', '.next/cache', 'out', '.vercel/output']
const HEAVY = ['node_modules', '.npm']

let targets = [...ALWAYS_CLEAN]
if (!TURBO_ONLY) targets = [...targets, ...BUILD_ARTIFACTS]
if (CLEAN_ALL) targets = [...targets, ...HEAVY]

// ─── Find directories to clean ───────────────────────────────────────────────
function findDirs(baseDir, names, depth = 0, maxDepth = 4) {
  if (depth > maxDepth) return []
  const results = []

  let entries
  try {
    entries = readdirSync(baseDir)
  } catch {
    return []
  }

  for (const entry of entries) {
    if (entry === 'node_modules' && depth > 0 && !CLEAN_ALL) continue

    const fullPath = join(baseDir, entry)

    try {
      const stat = statSync(fullPath)
      if (!stat.isDirectory()) continue
    } catch {
      continue
    }

    if (names.includes(entry)) {
      results.push(fullPath)
    } else {
      results.push(...findDirs(fullPath, names, depth + 1, maxDepth))
    }
  }

  return results
}

// ─── Run ─────────────────────────────────────────────────────────────────────
console.log('\n🧹 Agiliza Network — Limpeza do Monorepo')
console.log('─'.repeat(50))

const mode = TURBO_ONLY
  ? '[modo: turbo-only]'
  : CLEAN_ALL
  ? '[modo: completo (node_modules incluídos)]'
  : '[modo: artefatos de build]'
console.log(`📌 ${mode}\n`)

const dirsToRemove = findDirs(ROOT, targets)

if (dirsToRemove.length === 0) {
  console.log('✅ Nada para limpar. Diretório já está limpo!')
  process.exit(0)
}

let removed = 0
let errors = 0

for (const dir of dirsToRemove) {
  const rel = relative(ROOT, dir)
  try {
    rmSync(dir, { recursive: true, force: true })
    console.log(`  🗑️  ${rel}`)
    removed++
  } catch (err) {
    console.error(`  ❌ Erro ao remover ${rel}: ${err.message}`)
    errors++
  }
}

console.log('\n─'.repeat(50))
console.log(`✅ ${removed} diretório(s) removido(s)`)
if (errors > 0) console.warn(`⚠️  ${errors} erro(s) — verifique permissões`)

if (CLEAN_ALL) {
  console.log('\n💡 Execute npm install para reinstalar as dependências.')
}

console.log('')
