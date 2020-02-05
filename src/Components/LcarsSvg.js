import React from 'react';

function getFill(val) {
  return val ? val : 'gray';
}

export function ElbowLeftBottom(props) {
  return (
    <svg
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 300 90'
    >
      <path
        d='M150 90H75C33.58 90 0 56.61 0 15.41V0h150v22.87A37.26 37.26 0 0 0 187.5 60H300v30z'
        fill={getFill(props.fill)}
      />
    </svg>
  );
}

export function ElbowLeftTop(props) {
  return (
    <svg
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 300 90'
    >
      <path
        d='M150 0H75C33.58 0 0 33.39 0 74.59V90h150V67.13A37.26 37.26 0 0 1 187.5 30H300V0z'
        fill={getFill(props.fill)}
      />
    </svg>
  );
}

export function EndcapLeft(props) {
  return (
    <svg
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 45 30'
    >
      <path
        d='M15 30h30V0H15a15 15 0 0 0 0 30z'
        fill={getFill(props.fill)}
        data-name='Sprite End Cap Left'
      />
    </svg>
  );
}

export function EndcapRight(props) {
  return (
    <svg
      height='30'
      width='45'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 45 30'
    >
      <path
        d='M30 0H0v30h30a15 15 0 0 0 0-30z'
        fill={getFill(props.fill)}
        data-name='Sprite End Cap Right'
      />
    </svg>
  );
}
