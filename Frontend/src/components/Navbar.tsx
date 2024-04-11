import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/navbarStyles.css"



export default function Navbar(){



  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (button: string) => {
    setActiveButton(button);
  };


  return (
    <div className="btm-nav">
      <Link to="/" className={`text-sm ${activeButton === 'button1' ? 'clicked' : ''}`} onClick={() => handleClick('button1')}>
        <button>
          <i className="fa-solid fa-carrot text-2xl"></i>
        </button>
        <span className='text-sm'>Ingredients</span>
      </Link>
      <Link to="/dishes" className={`text-sm ${activeButton === 'button2' ? 'clicked' : ''}`} onClick={() => handleClick('button2')}>
        <button className="active">
          <i className="fa-solid fa-utensils text-2xl"></i>
        </button>
        <span className='text-sm'>Dishes</span>
      </Link>
      <div className={`text-sm ${activeButton === 'button3' ? 'clicked' : ''}`} onClick={() => handleClick('button3')}>
        <button>
          <i className="fa-solid fa-gear text-2xl"></i>
        </button>
        <span className='text-sm'>Settings</span>
      </div>
    </div>
  );
}