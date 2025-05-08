import { Templates } from "@/types/templates";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/hooks/useOutSideClick";

interface TemplateHolderProps {
  templates: Templates[];
  className?: string;
}

const TemplateHolder: React.FC<TemplateHolderProps> = ({
  templates,
  className = "",
}) => {
  const { navigation } = useAppSelector((state) => state.app);
  const selected = templates.find((tpl) => tpl.option === navigation);

  return (
    <div
      className={`${className} ${
        navigation === "settings" ? "" : ""
      } bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full min-h-[calc(100vh-112px)] overflow-hidden p-4 sm:p-6 md:p-8`}
    >
      <AnimatePresence mode="wait">
        <motion.section
          id={navigation}
          key={navigation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          {selected?.component ?? <p>No component found</p>}
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default TemplateHolder;
