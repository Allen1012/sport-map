import React from 'react';
import { formatPace, titleForRun, formatAverageHour } from 'src/utils/utils';
import { MAIN_COLOR } from 'src/utils/const';
import styles from './style.module.scss';

const RunRow = ({ runs, run, locateActivity, runIndex, setRunIndex }) => {
  const distance = (run.distance / 1000.0).toFixed(1);
  const pace = run.average_speed;
  const averageHeartrate = run.average_heartrate;

  const paceParts = pace ? formatPace(pace) : null;
  const averageHour = pace ? formatAverageHour(pace) : null;
  const heartRate = averageHeartrate ? averageHeartrate : null;

  // change click color
  const handleClick = (e, runs, run) => {
    const elementIndex = runs.indexOf(run);
    e.target.parentElement.style.color = 'orange';

    const elements = document.getElementsByClassName(styles.runRow);
    if (runIndex !== -1 && elementIndex !== runIndex) {
      elements[runIndex].style.color = MAIN_COLOR;
    }
    setRunIndex(elementIndex);
  };

  return (
    <tr
      className={styles.runRow}
      key={run.start_date_local}
      onClick={(e) => {
        handleClick(e, runs, run);
        locateActivity(run);
      }}
    >
      <td className={styles.runDate}>{run.start_date_local}</td>
      <td>{titleForRun(run)}</td>
      <td>{distance} km</td>
      <td>{run.moving_time}</td>
      <td>{paceParts}</td>
      <td>{averageHour} km/h</td>
      <td>{heartRate && heartRate.toFixed(0)}</td>

    </tr>
  );
};

export default RunRow;
