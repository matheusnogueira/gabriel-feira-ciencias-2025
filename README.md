# Quiz Educativo - Feira de Ciências 2025 🎓

## 📋 Sobre o Projeto

Quiz educativo desenvolvido para a Feira de Ciências 2025 do Colégio Pense Makenzie, focado em temas de saúde, saneamento básico, doenças e sistema imunológico.

### 🎯 Evento
- **Instituição:** Colégio Pense Makenzie
- **Turma:** 7º ano 2025
- **Data de apresentação:** 01/02/2025
- **Site:** [colegiopense.com.br](https://colegiopense.com.br/)

### 👥 Participantes
- Gabriel Uzai Nogueira
- Lucas Matheus Oliveira
- Lucas Siqueira
- Thales Veloso
- Caio Biazoto

## 🎨 Temas Abordados

- **Saneamento Básico** - Infraestrutura e importância
- **Doenças** - Tipos, causas e prevenção
- **Formas de Transmissão** - Como doenças se propagam
- **Sistema Imunológico** - Defesas do corpo humano
- **Índice de Saúde** - Indicadores e melhorias

## 🚀 Funcionalidades

### ✨ Principais
- ✅ **Randomização completa** - Perguntas e alternativas embaralhadas
- ✅ **Feedback educativo** - Explicações detalhadas para cada resposta
- ✅ **Sistema de pontuação** - Score, percentual e estatísticas por tema
- ✅ **Interface responsiva** - Design mobile-first com Tailwind CSS
- ✅ **Barra de progresso** - Acompanhamento visual do quiz

### 🎁 Diferenciais
- 🎵 **Sons** - Feedback sonoro para acertos e erros
- ⏱️ **Timer opcional** - 30 segundos por pergunta (pode ser desativado)
- 🌓 **Dark/Light Mode** - Alternância entre temas claro e escuro
- 🎊 **Animações** - Transições suaves e confetti ao acertar
- 🎖️ **Certificado digital** - Geração e download (70%+ de acertos)
- 📤 **Compartilhamento** - Botão para compartilhar resultados

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Framer Motion** - Animações
- **React Confetti** - Efeito de confetti
- **html2canvas** - Geração de certificado em imagem

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório** (ou baixe os arquivos)
```bash
git clone [URL_DO_REPOSITORIO]
cd gabriel-feira-ciencias-2025
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto localmente**
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`.

Para testar o build localmente:
```bash
npm run preview
```

## ☁️ Deploy no AWS S3

### Passo 1: Criar um Bucket S3

1. Acesse o [AWS Console](https://console.aws.amazon.com/s3/)
2. Clique em **"Create bucket"**
3. Escolha um nome único (ex: `quiz-feira-ciencias-2025`)
4. Selecione a região (ex: `us-east-1`)
5. **Desmarque** "Block all public access" (necessário para site público)
6. Marque a confirmação de que o bucket será público
7. Clique em **"Create bucket"**

### Passo 2: Configurar como Site Estático

1. Entre no bucket criado
2. Vá em **"Properties"** (Propriedades)
3. Role até **"Static website hosting"**
4. Clique em **"Edit"**
5. Selecione **"Enable"**
6. Em **"Index document"**, digite: `index.html`
7. Em **"Error document"**, digite: `index.html`
8. Clique em **"Save changes"**
9. **Anote a URL** do website (ex: `http://quiz-feira-ciencias-2025.s3-website-us-east-1.amazonaws.com`)

### Passo 3: Configurar Permissões Públicas

1. Vá em **"Permissions"** (Permissões)
2. Role até **"Bucket policy"**
3. Clique em **"Edit"**
4. Cole a seguinte política (substitua `YOUR-BUCKET-NAME` pelo nome do seu bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

5. Clique em **"Save changes"**

### Passo 4: Fazer Upload dos Arquivos

#### Opção A: Via Console AWS

1. Entre no bucket
2. Clique em **"Upload"**
3. Arraste todos os arquivos da pasta `dist/` (incluindo subpastas)
4. Clique em **"Upload"**

#### Opção B: Via AWS CLI (recomendado)

1. Instale a [AWS CLI](https://aws.amazon.com/cli/)
2. Configure suas credenciais:
```bash
aws configure
```

3. Execute o comando de sync:
```bash
aws s3 sync dist/ s3://YOUR-BUCKET-NAME --delete
```

### Passo 5: Acessar o Site

Acesse a URL anotada no Passo 2. Seu quiz estará online! 🎉

## 🚀 Deploy com CloudFront (Opcional - CDN + HTTPS)

Para melhor performance e suporte a HTTPS:

### 1. Criar uma Distribuição CloudFront

1. Acesse [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Clique em **"Create distribution"**
3. Em **"Origin domain"**, selecione seu bucket S3
4. Em **"Origin access"**, selecione **"Origin access control settings"**
5. Crie um novo OAC (Origin Access Control)
6. Em **"Default root object"**, digite: `index.html`
7. Configure **"Custom error responses"**:
   - Código de erro HTTP: `403`
   - Página de resposta: `/index.html`
   - Código de resposta HTTP: `200`
8. Clique em **"Create distribution"**

### 2. Atualizar Política do S3

O CloudFront fornecerá uma política para você adicionar ao bucket S3. Copie e cole no Bucket Policy.

### 3. Aguardar Deploy

O CloudFront pode levar 5-15 minutos para distribuir. Após isso, use a URL do CloudFront (ex: `https://d1234abcd.cloudfront.net`).

## 📱 Uso do Aplicativo

1. **Tela Inicial** - Clique em "Iniciar Quiz"
2. **Durante o Quiz**:
   - Leia a pergunta e selecione uma alternativa
   - Veja o feedback imediato com explicação
   - Clique em "Próxima Pergunta"
   - Use o botão de timer para ativar/desativar o cronômetro
   - Alterne entre modo claro/escuro com o botão no topo
3. **Resultados**:
   - Veja sua pontuação e percentual
   - Analise desempenho por tema
   - Compartilhe seus resultados
   - Gere certificado (se 70%+)
   - Refaça o quiz quantas vezes quiser

## 🎨 Paleta de Cores

- **Primary (Verde):** `#10b981` - Saúde e natureza
- **Secondary (Azul):** `#3b82f6` - Confiança e conhecimento
- **Success (Verde escuro):** `#059669`
- **Error (Vermelho):** `#ef4444`

## 📂 Estrutura do Projeto

```
src/
├── components/         # Componentes React
│   ├── Certificate.tsx
│   ├── HomeScreen.tsx
│   ├── ProgressBar.tsx
│   ├── Question.tsx
│   ├── QuizScreen.tsx
│   ├── ResultsScreen.tsx
│   ├── ShareButton.tsx
│   └── Timer.tsx
├── hooks/             # Custom hooks
│   ├── useQuiz.ts
│   ├── useSound.ts
│   └── useTheme.ts
├── utils/             # Funções utilitárias
│   ├── scoring.ts
│   ├── shuffle.ts
│   └── storage.ts
├── types/             # Tipos TypeScript
│   └── quiz.ts
├── data/              # Dados do quiz
│   └── perguntas.json
├── App.tsx            # Componente principal
├── main.tsx           # Entry point
└── index.css          # Estilos globais
```

## 🧪 Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Cria build de produção
npm run preview   # Preview do build de produção
npm run lint      # Executa linter
```

## 📝 Personalizações

### Adicionar/Editar Perguntas

Edite o arquivo `src/data/perguntas.json` seguindo o formato:

```json
{
  "id": 1,
  "tema": "Nome do Tema",
  "pergunta": "Texto da pergunta?",
  "alternativas": ["Opção A", "Opção B", "Opção C", "Opção D"],
  "respostaCorreta": 0,
  "explicacao": "Explicação da resposta correta.",
  "explicacaoErro": {
    "1": "Por que a opção B está errada",
    "2": "Por que a opção C está errada",
    "3": "Por que a opção D está errada"
  }
}
```

### Alterar Cores

Edite `tailwind.config.js` na seção `theme.extend.colors`.

### Ajustar Tempo do Timer

Em `src/components/QuizScreen.tsx`, linha com `<Timer duration={30}`, altere o valor 30 para o desejado (em segundos).

## 🐛 Troubleshooting

### Erro ao fazer build
- Certifique-se de que todas as dependências estão instaladas: `npm install`
- Limpe o cache: `rm -rf node_modules package-lock.json && npm install`

### Site não carrega no S3
- Verifique se o bucket está configurado para acesso público
- Confirme que a Bucket Policy está correta
- Certifique-se de que "Static website hosting" está habilitado

### Animações não funcionam
- Verifique se `framer-motion` está instalado
- Alguns navegadores antigos podem não suportar todas as animações

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte da Feira de Ciências 2025.

## 🤝 Contribuições

Projeto desenvolvido pelos alunos do 7º ano do Colégio Pense Makenzie.

---

**Desenvolvido com ❤️ para a Feira de Ciências 2025**

**Colégio Pense Makenzie** | 7º ano 2025 | Apresentação: 01/02/2025
