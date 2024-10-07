import { motion } from "framer-motion";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  notification?: string;
}

const Textarea = ({ value, onChange, notification }: TextareaProps) => {
  return (
    <motion.div className="relative"
      initial={{ opacity: 0 , filter: "blur(6px)"}}
      animate={{ opacity: 1, filter: "blur(0px)"}}
      transition={{ duration: 0.7, delay: 0.1}}
    >
      <textarea
        // className="w-full aspect-[16/7] resize-none rounded-xl overflow-auto outline-none p-4 shadow-sm bg-gradient-to-tr from-[#221c2cfd] via-[#1b1623f1] to-80% to-[#1b1623d9]   text-white text-base font-medium tracking-wide custom-scrollbar"
        className="w-full aspect-[16/7] resize-none rounded-xl overflow-auto outline-none p-4   border border-neutral-300 opacity-95 text-base font-medium tracking-wide custom-scrollbar shadow-sm"
        placeholder="Enter or paste your text here...  "
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      />
      {!notification && (
        <div className="absolute top-full  rounded-md py-1 px-2   font-medium text-lg text-rose-600 ">
          {notification}
        </div>
      )}
    </motion.div>
  );
};

export default Textarea;
