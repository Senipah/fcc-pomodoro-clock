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
  Surround,
  FlexDiv,
  Screen,
  MainScreen,
  ResponsiveFlexDiv
} from './Lcars';

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
      <ResponsiveFlexDiv>
        <ResponsiveFlexDiv
          id={`${props.name}-buttons`}
          smlFlexDirection='row'
          smlJustifyContent='center'
          lrgJustifyContent='flex-end'
        >
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
        </ResponsiveFlexDiv>
        <ResponsiveFlexDiv
          smlJustifyContent='center'
          lrgJustifyContent='flex-start'
        >
          <Screen id={`${props.name}-length`}>
            {state[`${props.name}Length`]}
          </Screen>
        </ResponsiveFlexDiv>
      </ResponsiveFlexDiv>
    </LcarsContainerSection>
  );
}

const Timer = props => {
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
        <FlexDiv flexDirection='column'>
          {/* <h2 id='timer-label'>{state.isSession ? 'Session' : 'Break'}</h2> */}
          <MainScreen id='time-left'>
            {`${formatTime(state.timerMinutes)}:${formatTime(state.timerSeconds)}`}
          </MainScreen>
          <FlexDiv id='timer-controls' flexDirection='row'>
            <Button
              id='start_stop'
              onClick={() => dispatch({ name: 'start_stop' })}
            >
              Start/Stop
            </Button>
            <Button id='reset' onClick={() => dispatch({ name: 'reset' })}>
              Reset
            </Button>
          </FlexDiv>
        </FlexDiv>
      </Surround>
    </LcarsContainerSection>
  );
};
