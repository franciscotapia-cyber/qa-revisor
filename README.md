# QA Revisor - CFT San Agustin

Sistema de revision de calidad (QA) de recursos multimedia educativos con analisis de IA.

## Que hace esta app

Permite revisar infografias, PDFs, videos e interactivos Genially de cada carrera, ciclo, modulo y semana. La IA analiza los recursos comparandolos contra un Kit de Marca institucional y referencias de archivos correctos.

## Arquitectura

```
Browser (index.html) --> /api/proxy (Vercel Serverless) --> api.anthropic.com
```

- **Frontend**: `index.html` - App monolitica HTML/CSS/JS
- - **Backend**: `api/proxy.js` - Proxy serverless que reenvia peticiones a Anthropic
  - - **Config**: `vercel.json` - Configuracion de funciones serverless
    - - **Deploy**: Vercel (auto-deploy desde GitHub)
     
      - ## Archivos del proyecto
     
      - | Archivo | Descripcion |
      - |---------|-------------|
      - | `index.html` | Frontend completo (UI + logica de negocio) |
      - | `api/proxy.js` | Proxy serverless - reenvia a Anthropic con API key segura |
      - | `vercel.json` | Config de funciones Vercel (memoria, timeout) |
      - | `package.json` | Metadatos del proyecto |
     
      - ## Como trabajar en la app
     
      - ### Requisitos
      - - Git instalado (https://git-scm.com)
        - - Cuenta GitHub con acceso al repo
          - - Editor de codigo (VS Code recomendado)
           
            - ### Clonar el proyecto
            - ```bash
              git clone https://github.com/franciscotapia-cyber/qa-revisor.git
              cd qa-revisor
              ```

              ### Hacer cambios
              1. Editar `index.html` para cambios de UI o logica
              2. 2. Editar `api/proxy.js` para cambios en el proxy
                 3. 3. Guardar y subir:
                    4. ```bash
                       git add .
                       git commit -m "descripcion del cambio"
                       git push
                       ```
                       4. Vercel re-deploya automaticamente en ~60 segundos
                      
                       5. ### Probar localmente (opcional)
                       6. ```bash
                          npm i -g vercel
                          vercel dev
                          ```
                          Requiere archivo `.env` con: `ANTHROPIC_API_KEY=tu-key`

                          ## Variables de entorno (Vercel)

                          | Variable | Donde | Valor |
                          |----------|-------|-------|
                          | `ANTHROPIC_API_KEY` | Vercel > Settings > Env Variables | Tu API key de Anthropic |

                          ## Modelo de IA

                          Actualmente usa `claude-haiku-4-5-20251001`. Para cambiarlo, buscar y reemplazar el nombre del modelo en `index.html`.

                          ## URL de produccion

                          https://qa-revisor.vercel.app

                          ## Carreras configuradas

                          - Gestion de Empresas (6 ciclos)
                          - - Gestion Contable (6 ciclos)
                            - - Adm. Publica (6 ciclos)
                              - - Gestion Logistica (6 ciclos)
                               
                                - ## Tipos de recursos por semana
                               
                                - - Infografia (captura de pantalla)
                                  - - PDF Material de estudio
                                    - - Video / Interactivo (hasta 3)
                                      - - Evaluacion
                                       
                                        - ## Kit de Marca
                                       
                                        - Configurado desde la seccion "Kit de marca" del sidebar. Define colores, tipografias e logos institucionales por modulo.
                                        - 
