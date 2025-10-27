# 🛠️ Comandos Úteis - Quiz Feira de Ciências 2025

## 📦 Gerenciamento de Dependências

```bash
# Instalar todas as dependências
npm install

# Instalar uma dependência nova
npm install nome-do-pacote

# Instalar dependência de desenvolvimento
npm install -D nome-do-pacote

# Atualizar dependências
npm update

# Verificar dependências desatualizadas
npm outdated

# Limpar cache do npm (se houver problemas)
npm cache clean --force
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar em porta específica
npm run dev -- --port 3000

# Iniciar e abrir no navegador
npm run dev -- --open

# Verificar problemas de linting
npm run lint

# Build de produção
npm run build

# Preview do build (teste local)
npm run preview
```

## 🧹 Limpeza e Manutenção

```bash
# Limpar build anterior
rm -rf dist

# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpar tudo (build + modules)
rm -rf dist node_modules package-lock.json
npm install
```

## 📊 Análise e Debug

```bash
# Ver tamanho do bundle
npm run build
ls -lh dist/assets/

# Analisar dependências
npm list

# Ver apenas dependências diretas
npm list --depth=0

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades automáticas
npm audit fix
```

## 🌐 Deploy AWS S3

```bash
# Fazer build
npm run build

# Upload via AWS CLI (método 1)
aws s3 sync dist/ s3://SEU-BUCKET-NAME --delete

# Upload com cache control (método 2)
aws s3 sync dist/ s3://SEU-BUCKET-NAME \
  --delete \
  --cache-control max-age=31536000,public

# Invalidar cache CloudFront (se estiver usando)
aws cloudfront create-invalidation \
  --distribution-id SUA-DISTRIBUTION-ID \
  --paths "/*"

# Ver arquivos no bucket
aws s3 ls s3://SEU-BUCKET-NAME/

# Configurar bucket como website
aws s3 website s3://SEU-BUCKET-NAME/ \
  --index-document index.html \
  --error-document index.html
```

## 🔧 Git (Controle de Versão)

```bash
# Inicializar repositório (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Commit com mensagem
git commit -m "feat: implementação completa do quiz"

# Ver status
git status

# Ver histórico
git log --oneline

# Criar branch
git checkout -b nome-da-branch

# Voltar para main
git checkout main

# Push para repositório remoto
git push origin main

# Adicionar repositório remoto
git remote add origin URL-DO-REPOSITORIO
```

## 📝 Personalização Rápida

```bash
# Editar perguntas
code src/data/perguntas.json

# Editar participantes
code src/components/HomeScreen.tsx

# Alterar cores
code tailwind.config.js

# Ajustar timer
code src/components/QuizScreen.tsx

# Modificar mensagens motivacionais
code src/utils/scoring.ts
```

## 🎨 Tailwind CSS

```bash
# Regenerar configuração do Tailwind
npx tailwindcss init -p

# Ver classes disponíveis
npx tailwindcss --help

# Build CSS standalone (se necessário)
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

## 📦 TypeScript

```bash
# Verificar erros TypeScript
npx tsc --noEmit

# Gerar tipos (se necessário)
npx tsc

# Ver configuração
cat tsconfig.json
```

## 🧪 Testes Úteis

```bash
# Testar build localmente
npm run build && npm run preview

# Verificar bundle size
npm run build
du -sh dist/

# Verificar estrutura de arquivos
tree -L 3 -I 'node_modules|dist'

# Ver portas em uso
lsof -i :5173
```

## 🔍 Debug e Troubleshooting

```bash
# Limpar tudo e recomeçar
rm -rf node_modules package-lock.json dist
npm install
npm run build

# Verificar versões
node --version
npm --version

# Ver variáveis de ambiente
printenv | grep NODE

# Debug de dependências
npm ls framer-motion
npm ls react

# Reinstalar dependência específica
npm uninstall framer-motion
npm install framer-motion
```

## 📱 Mobile Testing

```bash
# Iniciar dev server acessível na rede local
npm run dev -- --host

# Ver IP local (macOS/Linux)
ifconfig | grep "inet "

# Ver IP local (Windows)
ipconfig

# Acessar de outro dispositivo
# http://SEU-IP-LOCAL:5173
```

## 🎯 Comandos de Uma Linha

```bash
# Install → Build → Preview
npm install && npm run build && npm run preview

# Limpar → Install → Build
rm -rf dist node_modules && npm install && npm run build

# Build → Deploy S3
npm run build && aws s3 sync dist/ s3://SEU-BUCKET

# Git add → commit → push
git add . && git commit -m "update" && git push

# Ver estrutura do projeto
find src -type f -name "*.tsx" -o -name "*.ts"
```

## 💡 Dicas Rápidas

### Performance
```bash
# Analisar tamanho do bundle
npm run build
ls -lh dist/assets/*.js

# Ver quais dependências são maiores
npm list --depth=0 --long
```

### Segurança
```bash
# Verificar vulnerabilidades
npm audit

# Ver detalhes das vulnerabilidades
npm audit --audit-level=moderate
```

### Produtividade
```bash
# Alias útil para .bashrc ou .zshrc
alias dev='npm run dev'
alias build='npm run build'
alias deploy='npm run build && aws s3 sync dist/ s3://SEU-BUCKET'
```

---

## 🆘 Problemas Comuns

### Problema: "Port 5173 already in use"
```bash
# Matar processo na porta
lsof -ti:5173 | xargs kill -9

# Ou usar porta diferente
npm run dev -- --port 3000
```

### Problema: "Cannot find module"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Problema: Build com erro
```bash
# Limpar e rebuildar
rm -rf dist
npm run build
```

### Problema: Tailwind não funciona
```bash
# Verificar configuração
cat tailwind.config.js
cat postcss.config.js

# Reinstalar Tailwind
npm uninstall tailwindcss
npm install tailwindcss
```

---

**Dica:** Mantenha este arquivo aberto para consulta rápida durante o desenvolvimento!

**Desenvolvido para a Feira de Ciências 2025**  
**Colégio Pense Makenzie | 7º ano 2025**

