interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ input, onChange }: InputProps) => {
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type here..."
      />
    </>
  );
};

export default Input;
