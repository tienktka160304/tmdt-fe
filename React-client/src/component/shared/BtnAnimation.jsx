import { motion } from "framer-motion";

export default function BtnAnimation(params) {
  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {params.children}
    </motion.div>
  );
}
