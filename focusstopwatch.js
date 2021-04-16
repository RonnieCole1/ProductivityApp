const formatTime = timer => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Timer = () => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  return /*#__PURE__*/(
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("h3", null, "Focus Stopwatch"), /*#__PURE__*/
    React.createElement("div", { className: "stopwatch-card" }, /*#__PURE__*/
    React.createElement("p", null, formatTime(timer)), /*#__PURE__*/
    React.createElement("div", { className: "buttons" },

    !isActive && !isPaused ? /*#__PURE__*/
    React.createElement("button", { onClick: handleStart }, "Start") :

    isPaused ? /*#__PURE__*/React.createElement("button", { onClick: handlePause }, "Pause") : /*#__PURE__*/
    React.createElement("button", { onClick: handleResume }, "Resume"), /*#__PURE__*/


    React.createElement("button", { onClick: handleReset, disabled: !isActive }, "Reset")))));




};

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = React.useState(initialState);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset };
};

const App = () => /*#__PURE__*/
React.createElement(Timer, null);



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));