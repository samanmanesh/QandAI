interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const Textarea = ({ value, onChange }: TextareaProps) => {
  return (
    <textarea
      className="w-full aspect-[16/7] resize-none rounded-xl overflow-auto outline-none p-4 shadow-sm bg-gradient-to-tr from-[#221c2cfd] via-[#1b1623f1] to-80% to-[#1b1623d9]   text-white text-base font-medium tracking-wide"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={value}
    />
  );
};

export default Textarea;
