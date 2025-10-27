# Guia Rápido - Quiz Feira de Ciências 2025

## 🚀 Iniciar o Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar em Desenvolvimento
```bash
npm run dev
```
O projeto abrirá em: `http://localhost:5173`

### 3. Fazer Build
```bash
npm run build
```
Os arquivos estarão em: `dist/`

### 4. Testar o Build Localmente
```bash
npm run preview
```

## 📝 Personalizações Rápidas

### Adicionar/Editar Perguntas
Edite: `src/data/perguntas.json`

### Alterar Cores
Edite: `tailwind.config.js` → `theme.extend.colors`

### Ajustar Timer
Edite: `src/components/QuizScreen.tsx` → linha com `<Timer duration={30}`

### Modificar Participantes
Edite: `src/components/HomeScreen.tsx` → array `participantes`

## 🌐 Deploy Rápido no S3

```bash
# 1. Fazer build
npm run build

# 2. Upload (via AWS CLI)
aws s3 sync dist/ s3://SEU-BUCKET-NAME --delete

# 3. Configurar bucket como site estático no console AWS
```

## 🎨 Funcionalidades

- ✅ 20 perguntas randomizadas
- ✅ Alternativas embaralhadas
- ✅ Timer opcional (30s por pergunta)
- ✅ Feedback educativo com explicações
- ✅ Sistema de pontuação
- ✅ Estatísticas por tema
- ✅ Dark/Light mode
- ✅ Animações e confetti
- ✅ Sons de acerto/erro
- ✅ Certificado digital (70%+)
- ✅ Botão de compartilhamento
- ✅ 100% responsivo

## 📱 Temas do Quiz

1. Saneamento Básico
2. Doenças
3. Formas de transmissão
4. Sistema Imunológico
5. Índice de Saúde

## 🎓 Participantes

- Gabriel Uzai Nogueira
- Lucas Matheus Oliveira
- Lucas Siqueira
- Thales Veloso
- Caio Biazoto

---

**Colégio Pense Makenzie** | 7º ano 2025 | Apresentação: 01/02/2025


quero publicar essa aplicacao em um bucket do s3 (quiz-feira-ciencias-gabriel-2025). pode fazer o deploy, verificar permissões e deixar um script para build e deploy?
