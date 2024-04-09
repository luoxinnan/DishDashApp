import { CounterProps } from "./types/CounterTypes";
import './styles/counterStyles.css'


export default function Counter({ onChangeFunc, value }: CounterProps) {
  const handleIncrement = () => {
    onChangeFunc(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChangeFunc(value - 1);
    }
  };

  function handleNumberChange(quantity: string) {
    const newQantity = Number(quantity);
    onChangeFunc(newQantity);
  }

  return (

    <div className="ingred-counter relative flex items-center max-w-[8rem]">
      <button onClick={handleDecrement} id="decrement-button" data-input-counter-decrement="quantity-input"  className="btn btn-outline btn-primary btn-sm">
        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
        </svg>
      </button>
      <input value={value} onChange={(event) => handleNumberChange(event.target.value)} type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
      <button onClick={handleIncrement} id="decrement-button" data-input-counter-decrement="quantity-input"  className="btn btn-outline btn-primary btn-sm">
        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
        </svg>
      </button>
    </div>

  );
}