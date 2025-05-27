import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';

export default function MainTitle() {
  const navigate = useNavigate();

  const logout = () => {
    console.log('Logging out');
    navigate("/");
  };

  return (
    // Full-width container with black background
    <div style={{ width: '100%', backgroundColor: 'black' }}>
      {/* Flex container with reduced padding for smaller height */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px 16px', // decreased padding
        }}
      >
        {/* Left: Contact info */}
        <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <img src={Icon1} alt="Website Link" style={{ height: '20px' }} />
          <span style={{ marginLeft: '8px' }}>info@smartLeave.com</span>
        </div>

        {/* Right: Buttons and Icon */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Sign In Button */}
          <Button
            onClick={() => navigate('/Login')}
            variant="warning"
            className="mx-2 small-button main-button"
            style={{ fontSize: '0.8rem', padding: '4px 8px' }}
          >
            Sign In
          </Button>

          {/* Log Out Button */}
          <Button
            onClick={logout}
            variant="warning"
            className="mx-2 small-button main-button"
            style={{ fontSize: '0.8rem', padding: '4px 8px' }}
          >
            Log Out
          </Button>

          {/* Icon2 with matching size */}
          <div className="ms-3">
            <img src={Icon2} className="icon2" alt="Additional Icon" style={{ height: '27px', width: '45px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}