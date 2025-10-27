#!/bin/bash

# Quiz Educativo - Deploy Script
# Automatiza build e deploy para S3 + CloudFront

set -e

BUCKET_NAME="quiz-feira-ciencias-gabriel-2025"
REGION="us-east-1"
CLOUDFRONT_DISTRIBUTION_ID="E3JHTE5V1SO0H5"
CLOUDFRONT_URL="https://d3pi45ypt1epmm.cloudfront.net"

echo "🚀 Iniciando deploy do Quiz Educativo..."

# Build da aplicação
echo "📦 Fazendo build da aplicação..."
npm run build

# Upload para S3
echo "☁️ Fazendo upload para S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

# Invalidar cache do CloudFront
echo "🔄 Invalidando cache do CloudFront..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "✅ Deploy concluído com sucesso!"
echo "🌐 Aplicação disponível em: $CLOUDFRONT_URL"
echo "🔒 HTTPS habilitado para dispositivos móveis"
echo ""
echo "📊 Para ver estatísticas do bucket:"
echo "aws s3 ls s3://$BUCKET_NAME --recursive --human-readable --summarize"
echo ""
echo "⏱️ Nota: CloudFront pode levar alguns minutos para distribuir mudanças"
