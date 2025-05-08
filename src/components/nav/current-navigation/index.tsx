import { useAppSelector } from "@/redux/hooks/useOutSideClick";
import { motion, AnimatePresence } from "framer-motion";

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const CurrentNavigation = () => {
  const { navigation } = useAppSelector((state) => state.app);

  return (
    <div className="w-full py-4 px-2 text-center">
      <AnimatePresence mode="wait">
        <motion.h1
          key={navigation}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-xl font-inter sm:text-2xl md:text-3xl font-semibold tracking-wide bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent capitalize"
        >
          {navigation}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default CurrentNavigation;
