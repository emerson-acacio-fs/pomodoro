import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/use-interval';
import { Button } from './Button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    }
    if (resting) {
      document.body.classList.remove('working');
    }
  }, [working, resting]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );
  const configRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Work"
          onClick={() => {
            setTimeCounting(true);
            setWorking(true);
            setResting(false);
            setMainTime(props.pomodoroTime);
          }}
        />
        <Button text="Rest" onClick={() => configRest(false)} />
        {!working && !resting ? null : (
          <Button
            text={timeCounting ? 'pause' : 'Play'}
            onClick={() => {
              setTimeCounting(!timeCounting);
            }}
          />
        )}
      </div>
      <div className="details">
        <p> dddddd</p>
      </div>
    </div>
  );
}
