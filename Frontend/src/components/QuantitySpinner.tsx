import { quantitySpinnerProps } from "./types/quantitySpinnerTypes";


export default function Spinner({ onChange, value }: quantitySpinnerProps) {
    const handleIncrement = () => {
      onChange(value + 1);
    };
  
    const handleDecrement = () => {
      if (value > 0) {
        onChange(value - 1);
      }
    };
  
    return (
      <div>
        <button onClick={handleDecrement}>-</button>
        <input type="text" value={value} readOnly />
        <button onClick={handleIncrement}>+</button>
      </div>
    );
}