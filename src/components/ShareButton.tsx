import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  score: number;
  total: number;
}

export function ShareButton({ score, total }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Acertei ${score}/${total} no Quiz de Saúde da Feira de Ciências 2025! 🎓 #FeiraDeCiências #ColegioPenseMakenzie`;

  const handleShare = async () => {
    // Tenta usar Web Share API (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Feira de Ciências 2025',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (error) {
        // Usuário cancelou ou erro
        console.log('Compartilhamento cancelado');
      }
    }

    // Fallback: copia para clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  return (
    <motion.button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Copiado!</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Compartilhar</span>
        </>
      )}
    </motion.button>
  );
}

