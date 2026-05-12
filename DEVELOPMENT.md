# Guia de Desarrollo - QA Revisor

## Arquitectura

```
Navegador (index.html) --> /api/proxy.js (Vercel) --> api.anthropic.com (Claude)
```

## Archivos clave

- index.html - Frontend completo (127KB, monolitico)
- api/proxy.js - Proxy serverless (CommonJS con module.exports)
- vercel.json - Config de funciones (memory: 1024, maxDuration: 30)
- package.json - Solo metadatos, SIN dependencias

## Funciones importantes en index.html

- claudeCall(system, msgs) - Llama a /api/proxy con fetch
- generarUno(idx) - Orquesta el analisis de un recurso
- buildSystem() - Construye el prompt con kit de marca y referencias
- loadImg() - Carga imagen como base64 para enviar a la IA

## Como configurar un nuevo computador

```bash
# 1. Instalar Git: https://git-scm.com/downloads/win
# 2. Configurar identidad:
git config --global user.name "franciscotapia-cyber"
git config --global user.email "francisco.tapia@cftsanagustin.cl"

# 3. Clonar:
git clone https://github.com/franciscotapia-cyber/qa-revisor.git
cd qa-revisor

# 4. Abrir en VS Code:
code .
```

## Como hacer cambios y desplegar

```bash
git add .
git commit -m "descripcion del cambio"
git push
# Vercel re-despliega automaticamente en ~60 seg
```

## Probar localmente (opcional)

```bash
npm install -g vercel
vercel login
# Crear archivo .env con: ANTHROPIC_API_KEY=tu-key-aqui
vercel dev
```

## Variables de entorno en Vercel

| Variable | Valor |
|----------|-------|
| ANTHROPIC_API_KEY | (configurada en Vercel Dashboard) |

Dashboard: https://vercel.com/cft-francisco-tapia-s-projects/qa-revisor/settings/environment-variables

## Modelo de IA actual

claude-haiku-4-5-20251001 - buscar y reemplazar en index.html para cambiar.

## Reglas tecnicas IMPORTANTES

1. proxy.js DEBE usar module.exports = (NO export default)
2. proxy.js usa fetch() nativo (NO el SDK @anthropic-ai/sdk)
3. package.json NO debe tener dependencias
4. La API key NUNCA va en el codigo, solo en Vercel env vars

## Bugs corregidos (Mayo 2026)

| Bug | Solucion |
|-----|----------|
| CORS bloqueaba API de Anthropic | Creado proxy /api/proxy |
| API key expuesta en HTML | Movida a env var de Vercel |
| export default no funciona en Vercel | Cambiado a module.exports |
| Modelo claude-3-5-sonnet-20240620 no existe | Actualizado a claude-haiku-4-5-20251001 |

## URLs importantes

- Produccion: https://qa-revisor.vercel.app
- GitHub: https://github.com/franciscotapia-cyber/qa-revisor
- Vercel: https://vercel.com/cft-francisco-tapia-s-projects/qa-revisor
- Anthropic Console: https://console.anthropic.com
