import React from 'react';
import useHover from 'src/hooks/useHover';
import Stat from 'src/components/Stat';
import {formatAverageHour, formatPace} from 'src/utils/utils';
import useActivities from 'src/hooks/useActivities';
import styles from './style.module.scss';

const YearStat = ({ year, onClick }) => {
  let { activities: runs, years } = useActivities();
  // for hover
  const [hovered, eventHandlers] = useHover();
  // lazy Component
  const YearSVG = React.lazy(() =>
    import(`assets/year_${year}.svg`).catch(() => ({
      default: () => <div />,
    }))
  );

  if (years.includes(year)) {
    runs = runs.filter((run) => run.start_date_local.slice(0, 4) === year);
  }
  let sumDistance = 0;
  let streak = 0;
  let pace = 0;
  let paceCount = 0;
  let rideSum = 0;
  let rideCount = 0;
  let paceNullCount = 0;
  let rideNullCount = 0;
  let heartRate = 0;
  let heartRateNullCount = 0;
  runs.forEach((run) => {
    sumDistance += run.distance || 0;
    if (run.average_speed && run.type === 'Run') {
      pace += run.average_speed;
      paceCount++;
    }else if(run.average_speed && run.type === 'Ride'){
      rideSum += run.average_speed;
      rideCount++;
    }else {
      paceNullCount++;
    }
    if (run.average_heartrate) {
      heartRate += run.average_heartrate;
    } else {
      heartRateNullCount++;
    }
    if (run.streak) {
      streak = Math.max(streak, run.streak);
    }
  });
  sumDistance = (sumDistance / 1000.0).toFixed(1);
  const avgPace = formatPace(pace / paceCount);
  const avgHour = formatAverageHour(rideSum / rideCount);
  const hasHeartRate = !(heartRate === 0);
  const avgHeartRate = (heartRate / (runs.length - heartRateNullCount)).toFixed(
    0
  );
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(year)}
      {...eventHandlers}
    >
      <section>
        <Stat value={year} description=" Journey" />
        <Stat value={runs.filter(r => r.type == 'Run').length} description=" Runs" />
        <Stat value={runs.filter(r => r.type == 'Hike').length} description=" Hikes" />
        <Stat value={runs.filter(r => r.type == 'Ride').length} description=" Rides" />
        <Stat value={runs.filter(r => r.type == 'Swim').length} description=" Swims" />
        <Stat value={sumDistance} description=" KM" />
        <Stat value={avgPace} description=" Avg Pace" />
        <Stat value={avgHour} description=" 均速" />
        <Stat
          value={`${streak} day`}
          description=" Streak"
          className="mb0 pb0"
        />
        {hasHeartRate && (
          <Stat value={avgHeartRate} description=" Avg Heart Rate" />
        )}
      </section>
      {hovered && (
        <React.Suspense fallback="loading...">
          <YearSVG className={styles.yearSVG} />
        </React.Suspense>
      )}
      <hr color="red" />
    </div>
  );
};

export default YearStat;
