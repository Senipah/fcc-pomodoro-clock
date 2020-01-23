import React from 'react';
import './Clock.css';

function Session() {
  return (
    <div id='session'>
      <div id='session-label'>
        <h2>Session Length</h2>
      </div>
      <div id='session-buttons'>
        <button id='break-decrement'>Decrement</button>
        <button id='break-increment'>Increment</button>
      </div>
    </div>
  );
}

function Break() {
  return (
    <div id='break'>
      <div id='break-label'>
        <h2>Break Length</h2>
      </div>
      <div id='break-buttons'>
        <button id='break-decrement'>Decrement</button>
        <button id='break-increment'>Increment</button>
      </div>
    </div>
  );
}

function Clock() {
  return (
    <div id='clock'>
      <div id='controls'>
        <Break />
        <Session />
      </div>
      <h1>I'm a clock</h1>
    </div>
  );
}

export default Clock;
