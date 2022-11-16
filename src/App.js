import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });
  const [clockRuning, setCLockRuning] = useState(false);
  const [clockType, setClockType] = useState('session');



  const toggleClock = () => {
    setCLockRuning(current => !current);
  };

  function handleReset() {
    setClockType('session');
    setTimeLeft({ minutes: sessionLength, seconds: 0 });
    setSessionLength(25);
    setBreakLength(5);
    setCLockRuning(false);
    return;
  }

  function handleSetup(action) {

    if (!clockRuning) {
      switch (action.what) {
        case 'break':
          if (action.type === 'increment') {
            if (breakLength >= 60) {
              return;
            }
            setBreakLength(breakLength + 1);
          }
          if (action.type === 'decrement') {
            if (breakLength <= 1) {
              return;
            }
            setBreakLength(breakLength - 1);
          }
          break;
        case 'session':
          if (action.type === 'increment') {
            if (sessionLength >= 60) {
              return;
            }
            setSessionLength(sessionLength + 1);
          }
          if (action.type === 'decrement') {
            if (sessionLength <= 1) {
              return;
            }
            setSessionLength(sessionLength - 1);
          }
          break;
      }
    }
  }

  useEffect(() => {
    setTimeLeft({ minutes: sessionLength, seconds: 0 });
  }, [sessionLength]);

  useEffect(() => {
    if (clockRuning) {
      const interval = setInterval(() => {
        if (timeLeft.seconds === 0) {
          setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
        }
        else {
          setTimeLeft({ minutes: timeLeft.minutes, seconds: timeLeft.seconds - 1 });
        }
        if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
          if (clockType === 'session') {
            setTimeLeft({ minutes: breakLength, seconds: 0 });
            setClockType('break');
          }
          else if (clockType === 'break') {
            setTimeLeft({ minutes: sessionLength, seconds: 0 });
            setClockType('session');
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="App">
      <div id='title'>25 + 5 clock</div>
      <div className='setup-controls-container'>
        <div className='break-container'>
          <label id='break-label'>Break length</label>
          <div className='buttons-container'>
            <button id='break-increment' onClick={() => handleSetup({ what: 'break', type: 'increment' })}><FontAwesomeIcon icon={faArrowUp} size='xl'></FontAwesomeIcon></button>
            <h2 id='break-length'>{breakLength}</h2>
            <button id='break-decrement' onClick={() => handleSetup({ what: 'break', type: 'decrement' })}><FontAwesomeIcon icon={faArrowDown} size='xl'></FontAwesomeIcon></button>
          </div>
        </div>

        <div className='session-container'>
          <label id='session-label'>Session length</label>
          <div className='buttons-container'>
            <button id='session-increment' onClick={() => handleSetup({ what: 'session', type: 'increment' })}><FontAwesomeIcon icon={faArrowUp} size='xl'></FontAwesomeIcon></button>
            <h2 id='session-length'>{sessionLength}</h2>
            <button id='session-decrement' onClick={() => handleSetup({ what: 'session', type: 'decrement' })}><FontAwesomeIcon icon={faArrowDown} size='xl'></FontAwesomeIcon></button>

          </div>
        </div>

      </div>
      <div id='timer-container'>
        <label id='timer-label'>{`${clockType}`.toUpperCase()}</label>
        <h2 id='time-left'>{`${timeLeft.minutes}:${timeLeft.seconds.toLocaleString('en-Us', { minimumIntegerDigits: 2 })}`}</h2>
      </div>
      <div id='time-controls-container'>
        <button id='start_stop' onClick={toggleClock}><FontAwesomeIcon icon={faPlay} size='xl' /><FontAwesomeIcon icon={faPause} size='xl' /></button>
        <button onClick={handleReset} id='reset'><FontAwesomeIcon icon={faArrowsRotate} size='xl' /></button>

      </div>
    </div>
  );
}

export default App;
