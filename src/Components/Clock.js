import React from 'react';
import './Clock.css';
import alarm from '../assets/audio/alertklaxon_clean.mp3';
const { useReducer, createContext, useContext, useEffect, useRef } = React;

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerMinutes: 25,
  timerSeconds: 0,
  running: false,
  isSession: true
};

const ClockContext = createContext();

export default function Clock() {
  const [state, dispatch] = useReducer(clockReducer, initialState);
  return (
    <div id='clock'>
      <ClockContext.Provider value={{ state, dispatch }}>
        <ControlGroup />
        <Timer />
      </ClockContext.Provider>
    </div>
  );
}

function clockReducer(state, action) {
  const increment = val => {
    return (val += 1);
  };
  const decrement = val => {
    return (val -= 1);
  };

  const handleType = (val, type) => {
    if (type === 'increment') {
      const newVal = increment(val);
      return newVal > 60 ? val : newVal;
    } else if (type === 'decrement') {
      const newVal = decrement(val);
      return newVal < 1 ? val : newVal;
    }
    return val;
  };

  const tick = state => {
    const SECONDS_BOUND = 59;
    let { timerMinutes, timerSeconds } = state;
    timerSeconds = decrement(timerSeconds);
    if (timerSeconds < 0) {
      timerMinutes = decrement(timerMinutes);
      if (timerMinutes < 0) {
        //  interval change
        if (state.isSession) {
          timerMinutes = state.breakLength;
        } else {
          timerMinutes = state.sessionLength;
        }
        timerSeconds = initialState.timerSeconds;
        state.alert.current.play();
        return {
          ...state,
          timerMinutes: timerMinutes,
          timerSeconds: timerSeconds,
          isSession: !state.isSession
        };
      }
      return {
        ...state,
        timerMinutes: timerMinutes,
        timerSeconds: SECONDS_BOUND
      };
    }
    return {
      ...state,
      timerSeconds
    };
  };

  let newState = {};
  switch (action.name) {
    case 'session':
      const newSessionLength = handleType(state.sessionLength, action.type);
      if (state.running) {
        newState = {
          ...state,
          sessionLength: newSessionLength
        };
      } else {
        newState = {
          ...state,
          timerMinutes: newSessionLength,
          sessionLength: newSessionLength
        };
      }
      return newState;
    case 'break':
      const newBreakLength = handleType(state.breakLength, action.type);
      newState = {
        ...state,
        breakLength: newBreakLength
      };
      return newState;
    case 'start_stop':
      return { ...state, running: !state.running };
    case 'reset':
      state.alert.current.pause();
      state.alert.current.currentTime = 0;
      return initialState;
    case 'tick':
      return tick(state);
    default:
      return state;
  }
}

function Control(props) {
  const { state, dispatch } = useContext(ClockContext);
  const titleCase =
    props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase();
  return (
    <div id={props.name} className='control'>
      <div id={`${props.name}-label`} className='control-label'>
        <h2>{titleCase} Length</h2>
        <div id={`${props.name}-length`} className='control-value'>
          {state[`${props.name}Length`]}
        </div>
      </div>
      <div id={`${props.name}-buttons`} className='control-buttons'>
        <button
          id={`${props.name}-decrement`}
          onClick={() => dispatch({ name: props.name, type: 'decrement' })}
        >
          Decrement
        </button>
        <button
          id={`${props.name}-increment`}
          onClick={() => dispatch({ name: props.name, type: 'increment' })}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

function ControlGroup() {
  const controls = ['break', 'session'];
  return (
    <div id='controls'>
      {controls.map((e, i) => (
        <Control name={e} key={i} />
      ))}
    </div>
  );
}

function Timer() {
  const { state, dispatch } = useContext(ClockContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.running) {
        dispatch({ name: 'tick' });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, state.running]);

  const formatTime = val => {
    if (val < 0) {
      return '00';
    }
    if (val < 10) {
      return '0' + val;
    }
    return val;
  };

  const alert = useRef(null);
  state['alert'] = alert;
  // const alarm =
  //   'https://www.trekcore.com/audio/redalertandklaxons/alertklaxon_clean.mp3';

  return (
    <div id='timer'>
      <audio src={alarm} ref={alert} className='clip' id='beep' />
      <h2 id='timer-label'>{state.isSession ? 'Session' : 'Break'}</h2>
      <div id='time-left'>
        <span>{formatTime(state.timerMinutes)}</span>
        <span>:</span>
        <span>{formatTime(state.timerSeconds)}</span>
      </div>
      <div id='timer-controls'>
        <button
          id='start_stop'
          onClick={() => dispatch({ name: 'start_stop' })}
        >
          Start/Stop
        </button>
        <button id='reset' onClick={() => dispatch({ name: 'reset' })}>
          Reset
        </button>
      </div>
    </div>
  );
}
