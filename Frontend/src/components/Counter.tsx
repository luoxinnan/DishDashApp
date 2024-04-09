import { CounterProps } from "./types/CounterTypes";


export default function Counter({ onChangeFunc, value }: CounterProps) {
    const handleIncrement = () => {
      onChangeFunc(value + 1);
    };
  
    const handleDecrement = () => {
      if (value > 0) {
        onChangeFunc(value - 1);
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