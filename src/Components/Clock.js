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

const ClockContext = React.createContext();

function clockReducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default function Clock() {
  const [state, dispatch] = useReducer(clockReducer, initialState);
  return (
    <div id='clock'>
      <ClockContext.Provider value={{ state: state, dispatch: dispatch }}>
        <ControlGroup />
        <Timer />
      </ClockContext.Provider>
    </div>
  );
}

function Timer() {
  const { state } = React.useContext(ClockContext);
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

function Control(props) {
  const { state } = React.useContext(ClockContext);
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
        <button id={`${props.name}-decrement`}>Decrement</button>
        <button id={`${props.name}-increment`}>Increment</button>
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
