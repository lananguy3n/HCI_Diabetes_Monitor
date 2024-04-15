import React, { useState } from 'react';

function BloodGlucose({ user, onLogout }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reading, setReading] = useState('');
  const [message, setMessage] = useState('');
  const [reason, setReason] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const promptForReading = () => {
    setIsSubmitting(true);
    setMessage('');
    setReason('');
  };

  const handleNoReading = () => {
    setShowAlert(true);
    setIsSubmitting(true); // Assuming you still want to allow users to input their reading after this
  };

  const handleGoBack = () => {
    setIsSubmitting(false);
    setMessage('');
    setReading('');
    setReason('');
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleSubmit = () => {
    const numReading = parseInt(reading, 10);
    if (isNaN(numReading) || numReading < 0 || numReading > 999) {
      setMessage("Please enter a valid glucose reading between 0 and 999.");
    } else {
      let messageContent = '';
      if (numReading < user.lowGlucoseLevel) {
        messageContent = `Your glucose level is low (${numReading} mg/dL). Please eat a sugar source, take your medicine, and have snacks and meals as advised by your doctor.`;
      } else if (numReading > user.highGlucoseLevel) {
        messageContent = `Your glucose level is high (${numReading} mg/dL). Please contact ${user.doctor} immediately at ${user.doctorPhone}. Check for ketones in your urine.`;
      } else {
        messageContent = `Your glucose level is normal (${numReading} mg/dL). Keep up the good work!`;
        // Do not reset isSubmitting if the reading is normal as we still want to show the message
      }
      setMessage(messageContent);
      // Only reset isSubmitting if the reading is not normal
      if (numReading <= user.lowGlucoseLevel || numReading >= user.highGlucoseLevel) {
        setIsSubmitting(true);
      }
    }
  };

  const handleReasonSubmission = () => {
    if (!reason.trim()) {
      setMessage(prevMessage => `${prevMessage} Please provide a reason for the abnormal reading.`);
    } else {
      setMessage(prevMessage => `${prevMessage} Reason for abnormal reading: ${reason}.`);
    }
  };

  return (
    <div className="blood-glucose-monitor">
      <div className="header">
        <h1>Diabetes Monitoring</h1>
        <p>Patient: {user.name} (ID: {user.id})</p>
        <button onClick={onLogout}>Logout</button>
        <button onClick={toggleHelp} className="help-button">Help</button>
      </div>
      {showHelp && (
        <div className="help-panel">
          <p>Need assistance? Here are some tips:</p>
          <ul>
            <li>Enter your glucose reading in the field provided.</li>
            <li>If your reading is abnormal, provide a reason in the input box that appears.</li>
            <li>Use the 'Logout' button to exit the system after you've submitted your information.</li>
          </ul>
        </div>
      )}
      {!isSubmitting ? (
        <div className="card">
          <p>Have you taken your blood glucose reading today?</p>
          <button onClick={promptForReading}>Yes, I have taken it</button>
          <button onClick={handleNoReading}>No, I have not taken it</button>
          {showAlert && (
            <p className="alert-message">Please immediately report your glucose levels!</p>
          )}
        </div>
      ) : (
        <>
          <div className="reading">
          <h3>Glucose Input</h3>
            <div className="input-and-button">
              <input
                type="number"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
                placeholder="Enter your glucose reading"
                min="0"
                max="999"
              />
              <button className="button" onClick={handleSubmit}>Submit</button>
            </div>
            {message && <p>{message}</p>}
          </div>

          {(reading < user.lowGlucoseLevel || reading > user.highGlucoseLevel) && (
          <div className="explanation">
            <h3>Abnormal Glucose Levels </h3>
            <div className="prompt-and-reason">
              <p className="explanation-prompt">Please explain why your reading is abnormal:</p>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (e.g., Drank soda, Has the flu, Ate a big lunch)"
              />
              <button className="button" onClick={handleReasonSubmission}>Submit Reason</button>
            </div>
          </div>
        )}
        </>
      )}
    </div>
  );
}

export default BloodGlucose;
