import React from 'react';
import './Clock.css';
const { useReducer, createContext, useContext } = React;

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerVal: 25,
  running: false,
  onBreak: false
};

const ClockContext = createContext(initialState);

export default function Clock() {
  const state = useContext(ClockContext);
  return (
    <div id='clock'>
      <ClockContext.Provider value={state}>
        <ControlGroup />
        <Timer />
      </ClockContext.Provider>
    </div>
  );
}

function Timer() {
  const state = useContext(ClockContext);
  return (
    <div id='timer'>
      <h2 id='timer-label'>{state.onBreak ? 'Session' : 'Break'}</h2>
      <div id='time-left'>{state.timerVal}</div>
      <div id='timer-controls'>
        <button id='start_stop'>Start/Stop</button>
        <button id='reset'>Reset</button>
      </div>
    </div>
  );
}

function controlReducer(state, action) {
  const increment = val => {
    return (val += 1);
  };
  const decrement = val => {
    return (val -= 1);
  };

  const handleType = (val, type) => {
    if (type === 'increment') {
      return increment(val);
    } else if (type === 'decrement') {
      return decrement(val);
    }
    return val;
  };

  switch (action.name) {
    case 'session':
      return {
        ...state,
        sessionLength: handleType(state.sessionLength, action.type)
      };
    case 'break':
      return {
        ...state,
        breakLength: handleType(state.breakLength, action.type)
      };
    default:
      return state;
  }
}

function Control(props) {
  const [state, dispatch] = useReducer(
    controlReducer,
    useContext(ClockContext)
  );
  const titleCase =
    props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase();
  console.log(`${props.name}Length`);
  console.log(state);
  console.log(state[`${props.name}Length`]);
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
          onClick={() => dispatch({ ...props, type: 'decrement' })}
        >
          Decrement
        </button>
        <button
          id={`${props.name}-increment`}
          onClick={() => dispatch({ ...props, type: 'increment' })}
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
      {controls.map(e => (
        <Control name={e} />
      ))}
    </div>
  );
}
