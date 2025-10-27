import { motion } from 'framer-motion';

interface HomeScreenProps {
  onStart: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const participantes = [
  'Gabriel Uzai Nogueira',
  'Lucas Matheus Oliveira',
  'Lucas Siqueira',
  'Thales Veloso',
  'Caio Biazoto',
];

export function HomeScreen({ onStart, isDark, onToggleTheme }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Toggle Theme */}
        <motion.button
          onClick={onToggleTheme}
          className="fixed top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDark ? (
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12"
        >
          {/* Logo/Nome da Escola */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-center mb-6"
          >
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Colégio Pense Makenzie
              </h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <a
                href="https://colegiopense.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                colegiopense.com.br
              </a>
            </p>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mb-2">
              Quiz Educativo
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Feira de Ciências 2025
            </h3>
            <p className="text-gray-600 dark:text-gray-400">7º ano 2025</p>
          </motion.div>

          {/* Temas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-700 rounded-lg"
          >
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">
              📚 Temas do Quiz
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {['Saneamento Básico', 'Doenças', 'Formas de transmissão', 'Sistema Imunológico', 'Índice de Saúde'].map(
                (tema, i) => (
                  <motion.span
                    key={tema}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium shadow"
                  >
                    {tema}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>

          {/* Participantes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">
              👥 Desenvolvido por
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {participantes.map((nome, i) => (
                <motion.div
                  key={nome}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {nome.charAt(0)}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    {nome}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Data de apresentação */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm"
          >
            📅 Data da apresentação: <strong>01/02/2025</strong>
          </motion.p>

          {/* Botão Iniciar */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={onStart}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-lg font-bold text-xl shadow-lg hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar Quiz 🚀
          </motion.button>

          {/* Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm"
          >
            20 perguntas sobre saúde e saneamento básico
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

