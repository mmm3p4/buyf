import { FaArrowLeft } from 'react-icons/fa';

function LeftButton({ handlePast }) {
  return (
    <button className="leftbtn" onClick={handlePast}>
      <FaArrowLeft />
    </button>
  );
}

export default LeftButton;