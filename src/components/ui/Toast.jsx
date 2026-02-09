import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl max-w-sm"
            style={{
              background: type === 'success' ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {type === 'success' ? (
              <CheckCircle className="text-white" size={20} />
            ) : (
              <XCircle className="text-white" size={20} />
            )}
            <span className="text-white font-medium text-sm">{message}</span>
            <button onClick={onClose} className="text-white/70 hover:text-white ml-2">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
