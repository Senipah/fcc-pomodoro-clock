import React from 'react';
import alarm from '../assets/audio/alertklaxon_clean.mp3';
import {
  LcarsWrapper,
  LcarsHeader,
  LcarsContainer,
  themeColors,
  LcarsContainerSection,
  Button,
  ButtonLeft,
  ButtonRight,
  Surround
} from './Lcars';
import styled from 'styled-components';
const { useReducer, createContext, useContext, useEffect, useRef } = React;

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerMinutes: 25,
  timerSeconds: 0,
  running: false,
  isSession: true,
  blinkCount: 0
};

const ClockContext = createContext();

export default function Clock() {
  const [state, dispatch] = useReducer(clockReducer, initialState);
  return (
    <ClockContext.Provider value={{ state, dispatch }}>
      <LcarsWrapper>
        <LcarsHeader title='pomodoro clock' themeColor={themeColors.lcars4} />
        <LcarsContainer title='timer' themeColor={themeColors.lcars1}>
          <Control name='session' themeColor={themeColors.lcars5} />
          <Control name='break' themeColor={themeColors.lcars6} />
          <Timer
            themeColor={
              state.isSession ? themeColors.lcars5 : themeColors.lcars6
            }
          />
        </LcarsContainer>
      </LcarsWrapper>
    </ClockContext.Provider>
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
    let { timerMinutes, timerSeconds, blinkCount } = state;
    timerSeconds = decrement(timerSeconds);
    blinkCount = blinkCount > 0 ? blinkCount - 1 : blinkCount;
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
        blinkCount = 3;
        state.alert.current.play();
        return {
          ...state,
          blinkCount: blinkCount,
          timerMinutes: timerMinutes,
          timerSeconds: timerSeconds,
          isSession: !state.isSession
        };
      }
      return {
        ...state,
        blinkCount: blinkCount,
        timerMinutes: timerMinutes,
        timerSeconds: SECONDS_BOUND
      };
    }
    return {
      ...state,
      timerSeconds,
      blinkCount
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

const Screen = styled.div`
  margin: 0 1rem;
  font-size: 2rem;
  min-width: 6rem;
  border: 1px dashed #333;
  text-align: center;
  color: ${themeColors.modern};
`;

function Control(props) {
  const { state, dispatch } = useContext(ClockContext);
  const titleCase =
    props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase();
  return (
    <LcarsContainerSection
      id={props.name}
      title={`${titleCase} Length`}
      themeColor={props.themeColor}
    >
      <div id={`${props.name}-buttons`}>
        <ButtonLeft
          id={`${props.name}-increment`}
          onClick={() => dispatch({ name: props.name, type: 'increment' })}
        >
          Increment
        </ButtonLeft>
        <ButtonRight
          id={`${props.name}-decrement`}
          onClick={() => dispatch({ name: props.name, type: 'decrement' })}
        >
          Decrement
        </ButtonRight>
      </div>
      <Screen id={`${props.name}-length`}>
        {state[`${props.name}Length`]}
      </Screen>
    </LcarsContainerSection>
  );
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MainScreen = styled(Screen)`
  padding: 0.5rem 1rem;
  font-size: 4rem;
`;

function Timer(props) {
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
    <LcarsContainerSection
      id='timer'
      title={state.isSession ? 'Session' : 'Break'}
      themeColor={props.themeColor}
    >
      <audio src={alarm} ref={alert} id='beep' />
      <Surround
        themeColor={state.blinkCount ? themeColors.alert : themeColors.modern}
      >
        <FlexColumn>
          {/* <h2 id='timer-label'>{state.isSession ? 'Session' : 'Break'}</h2> */}
          <MainScreen id='time-left'>
            <span>{formatTime(state.timerMinutes)}</span>
            <span>:</span>
            <span>{formatTime(state.timerSeconds)}</span>
          </MainScreen>
          <div id='timer-controls'>
            <Button
              id='start_stop'
              onClick={() => dispatch({ name: 'start_stop' })}
            >
              Start/Stop
            </Button>
            <Button id='reset' onClick={() => dispatch({ name: 'reset' })}>
              Reset
            </Button>
          </div>
        </FlexColumn>
      </Surround>
    </LcarsContainerSection>
  );
}
