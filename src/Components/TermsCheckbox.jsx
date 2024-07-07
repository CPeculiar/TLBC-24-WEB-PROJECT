import React from 'react';
import '../Styles/OtherStyles.css'


const TermsCheckbox = ({ termsAccepted, handleTermsAccepted }) => {
  return (
    <div className="form-group mb-3">
      <div className="d-flex align-items-start">
        <div className="form-check">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={termsAccepted}
            onChange={handleTermsAccepted}
            className="form-check-input custom-checkbox"
          />
          <label
            htmlFor="termsCheckbox"
            className="form-check-label small ms-2"
            style={{ lineHeight: '1.2' }}
          >
            Please note that trousers and any form of indecent dressing
            will not be allowed for females. Check the box above if you consent
            to this.
          </label>
        </div>
      </div>
    </div>
  );
};

export default TermsCheckbox;