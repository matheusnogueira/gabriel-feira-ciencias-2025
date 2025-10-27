import { useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

interface CertificateProps {
  score: number;
  total: number;
  percentage: number;
  onClose: () => void;
}

export function Certificate({ score, total, percentage, onClose }: CertificateProps) {
  const [userName, setUserName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!userName.trim()) {
      alert('Por favor, digite seu nome!');
      return;
    }

    setIsDownloading(true);
    const certificate = document.getElementById('certificate');
    if (certificate) {
      try {
        const canvas = await html2canvas(certificate, {
          scale: 2,
          backgroundColor: '#ffffff',
        });
        const link = document.createElement('a');
        link.download = `certificado-feira-ciencias-2025-${userName.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Erro ao gerar certificado:', error);
        alert('Erro ao gerar certificado. Tente novamente.');
      }
    }
    setIsDownloading(false);
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Digite seu nome para o certificado:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Seu nome completo"
            maxLength={50}
          />
        </div>

        <div
          id="certificate"
          className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-lg border-4 border-primary-500"
        >
          <div className="text-center space-y-4">
            <div className="text-primary-600 font-bold text-2xl">
              CERTIFICADO DE PARTICIPAÇÃO
            </div>
            
            <div className="text-gray-600 text-sm">
              Feira de Ciências 2025
            </div>

            <div className="text-xl font-semibold text-gray-800 my-6">
              Colégio Pense Makenzie
            </div>

            <div className="text-gray-700 text-sm">
              Certificamos que
            </div>

            <div className="text-3xl font-bold text-primary-700 my-4 min-h-[3rem] flex items-center justify-center">
              {userName || '_____________________'}
            </div>

            <div className="text-gray-700 text-sm leading-relaxed max-w-md mx-auto">
              Participou do Quiz Educativo sobre Saneamento Básico, Doenças e Sistema Imunológico,
              alcançando a pontuação de <strong>{score}/{total}</strong> ({percentage}%)
            </div>

            <div className="mt-6 text-gray-600 text-sm">
              {currentDate}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="text-xs text-gray-600">
                Projeto desenvolvido por:
              </div>
              <div className="text-sm text-gray-700 font-medium mt-2">
                Gabriel Uzai Nogueira, Lucas Matheus Oliveira, Lucas Siqueira,<br />
                Thales Veloso e Caio Biazoto
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              7º ano 2025 | Data de apresentação: 01/02/2025
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? 'Gerando...' : 'Baixar Certificado'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

