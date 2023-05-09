import { FaArrowRight } from 'react-icons/fa';

function RightButton({ handleNext }) {
  return (
    <button className="rightbtn" onClick={handleNext}>
      <FaArrowRight />
    </button>
  );
}


export default RightButton;

