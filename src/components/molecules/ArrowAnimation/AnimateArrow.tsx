import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  isOpen: boolean;
};

export const ArrowAnimation: React.FC<Props> = ({ isOpen }) => {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowUp size={32} />
    </motion.div>
  );
};
