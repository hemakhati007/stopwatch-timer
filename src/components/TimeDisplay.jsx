import "./TimerDisplay.css";

import { useState, useRef } from "react";

export default function TimeDisplay() {
  const [state, setState] = useState("stopwatch");
  const [input, setInput] = useState({
    Hr: 0,
    Min: 0,
  });
  const [board, setboard] = useState(false);

  const [active, setActive] = useState("stopwatch");

  // const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

//   const [Hr, setHour] = useState(0);
//   const [Min, setMin] = useState(0);
//   const [Sec, setSec] = useState(58);

  const [stopwatchTime, setStopwatch] = useState({
    Hr: 0,
    Min: 0,
    Sec: 0,
  });

  const [timerTime, setTimer] = useState({
    Hr: 0,
    Min: 0,
    Sec: 0,
  });

  // console.log(stopwatchTime.Hr);

  const stopwatchRef = useRef(null);
  const timerRef = useRef(null);

  function startWatch() {
    // Prevent multiple intervals

    if (state === "stopwatch") {
      if (stopwatchRef.current != null) return;
      try {
        stopwatchRef.current = setInterval(() => {
          setStopwatch((prev) => {
            let { Hr, Min, Sec } = prev;
            Sec++;
            if (Sec === 60) {
              Sec = 0;
              Min++;
            }
            if (Min === 60) {
              Hr++;
              Min = 0;
            }
            return { Hr, Min, Sec };
          });
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    } else if (state === "timer") {
      console.log("timer");

      if (timerRef.current !== null) return;

      timerRef.current = setInterval(() => {
        console.log("timer");

        setTimer((prev) => {
          let { Hr, Min, Sec } = prev;

          if (Hr === 0 && Min === 0 && Sec === 0) {
            stopTimer();
            return prev;
          }

          if (Sec !== 0) {
            Sec--;
          }

          if (Sec === 0 && Min !== 0) {
            Min--;
            Sec = 60;
          }

          if (Min === 0 && Hr !== 0) {
            Min = 60;
            Hr--;
          }
          return { Hr, Min, Sec };
        });
      }, 1000);
    }
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  }

  function handlePause() {
    if (state === "stopwatch") {
      clearInterval(stopwatchRef.current);
      stopwatchRef.current = null;
    } else if (state === "timer") {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }

  function handleStart() {
    startWatch();
    setIsRunning(true);
  }

    function handleResetEnd() {
        console.log(state);
        console.log(active);
        
    if (state === "stopwatch") {
      clearInterval(stopwatchRef.current);
      stopwatchRef.current = null;

        if (active === "stopwatch") {
             setStopwatch({
               Hr: 0,
               Min: 0,
               Sec: 0,
             });
        } else {
             setTimer({
               Hr: input.Hr,
               Min: input.Min,
               Sec: 0,
             });
             setState("timer");
            
        }
     
    } else if (state === "timer") {
      clearInterval(timerRef.current);
        timerRef.current = null;
       
            setTimer({
            Hr: input.Hr,
            Min: input.Min,
            Sec: 0,
            });
        if(active==="stopwatch") {
             setStopwatch({
               Hr: 0,
               Min: 0,
               Sec: 0,
             });
            setState("stopwatch");
        }
    }

    setIsRunning(false);
  }
  function handleResetStart() {
    // setHour(0);
    // setMin(0);
    // setSec(0);

   
      setStopwatch({
        Hr: 0,
        Min: 0,
        Sec: 0,
      });
    if (state === "timer") {
      setTimer({
        Hr: input.Hr,
        Min: input.Min,
        Sec: 0,
      });
    }
    setIsRunning(true);
    startWatch();
  }

  function showBoard() {
    setboard(!board);
  }


  function handleInput(e) {
    // Allow control keys

    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      return;
    }

    // Allow only digits
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  }

  function handleInputMin(e) {
    console.log(e.target.value);

    let val = e.target.value;
    // if not number
    // if (!/^\d+$/.test(val)) return;

    // // the val itself is the whole number
    // // but as we have 00 in front type conversion to number wil give NaN
    // // user defined converion
    console.log(val);
    let num = 0;
    let i = 0;
    while (i < val.length) {
      num = num * 10 + Number(val[i]);
      i++;
    }
    console.log(num);

    num = num > 60 ? 60 : num;

    //   setMin(num);
    setInput((prev) => ({
      ...prev,
      Min: num,
    }));
    setTimer((prev) => ({
      ...prev,
      Min: num,
    }));
  }

  function handleInputHour(e) {
    console.log(e.target.value);

    let val = e.target.value;
    // if not number
    // if (!/^\d+$/.test(val)) return;

    // // the val itself is the whole number
    // // but as we have 00 in front type conversion to number wil give NaN
    // // user defined converion
    console.log(val);
    let num = 0;
    let i = 0;
    while (i < val.length) {
      num = num * 10 + Number(val[i]);
      i++;
    }
    console.log(num);

    num = num > 10 ? 10 : num;

    setInput((prev) => ({
      ...prev,
      Hr: num,
    }));
    setTimer((prev) => ({
      ...prev,
      Hr: num,
    }));
  }

  return (
    <>
      <div className="timer-stopwatch flex-center-row padding-p1 margin-m2">
        <div className="start-pause flex-center-row">
          {isRunning ? (
            <img
              className="pause"
              width="20"
              height="20"
              src="https://img.icons8.com/material-rounded/24/F25081/pause.png"
              alt="pause"
              onClick={handlePause}
            />
          ) : (
            <img
              className="start"
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/F25081/start.png"
              alt="start"
              onClick={handleStart}
            />
          )}
        </div>
        <div className="time flex-center-row">
          <div id="time-hr">
            {state === "stopwatch"
              ? String(stopwatchTime.Hr).padStart(2, "0")
              : String(timerTime.Hr).padStart(2, "0")}
          </div>
          <span>:</span>
          <div id="time-min">
            {" "}
            {state === "stopwatch"
              ? String(stopwatchTime.Min).padStart(2, "0")
              : String(timerTime.Min).padStart(2, "0")}
          </div>
          <span>:</span>
          <div id="time-sec">
            {" "}
            {state === "stopwatch"
              ? String(stopwatchTime.Sec).padStart(2, "0")
              : String(timerTime.Sec).padStart(2, "0")}
          </div>
        </div>
        <div className="reset flex-center-row">
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency-systems-regular/48/F25081/recurring-appointment.png"
            alt="recurring-appointment"
            onClick={showBoard}
          />
        </div>

        {board && (
          <div className="selection-board padding-p2">
            <div className="select">
              <div
                className={`${active === "stopwatch" ? "active" : ""} stopwatch`}
                              onClick={() => {
                                  setActive("stopwatch")
                                  if (!isRunning) {
                       setState("stopwatch")
                   }
                }}
              >
                <h5>Stopwatch</h5>
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-glyphs/30/F25081/time--v1.png"
                  alt="time--v1"
                />
              </div>
              <div
                className={`${active === "timer" ? "active" : ""} timer`}
                              onClick={() => {
                                  setActive("timer")
                    if (!isRunning) {
                      setState("timer");
                    }
                }}
              >
                <h5>Timer</h5>
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/ios-glyphs/30/F25081/timer.png"
                  alt="timer"
                />

               {active==="timer"&&( <div className="timer-form">
                  <input
                    className="input"
                    type="text"
                    inputMode="numeric"
                    placeholder="00"
                    value={String(input.Hr).padStart(2, "0")}
                    onKeyDown={handleInput}
                    onChange={handleInputHour}
                  />
                  <h6>hr</h6>
                  <input
                    className="input"
                    type="text"
                    placeholder="00"
                    value={String(input.Min).padStart(2, "0")}
                    onKeyDown={handleInput}
                    onChange={handleInputMin}
                  />
                  <h6>min</h6>
                </div>)}
              </div>
            </div>
            <div className={`${state===active?"end":"end end-alert"}`}>
              {isRunning ? (
                <>
                  <img
                    className="pause"
                    width="20"
                    height="20"
                    src="https://img.icons8.com/material-rounded/24/F25081/pause.png"
                    alt="pause"
                    onClick={handleResetEnd}
                  />
                  <h5>
                    End {`${state === "stopwatch" ? "Stopwatch" : "Timer"}`}
                  </h5>
                </>
              ) : (
                <>
                  <img
                    className="start"
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios-glyphs/30/F25081/start.png"
                    alt="start"
                    onClick={handleResetStart}
                  />
                  <h5>
                    Start {`${state === "stopwatch" ? "Stopwatch" : "Timer"}`}
                  </h5>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
