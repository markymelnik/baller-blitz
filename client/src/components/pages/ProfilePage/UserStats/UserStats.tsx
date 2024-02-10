import './user-stats.scss';

export const UserStats = () => {
  return (
    <div className='user-stats'>
      <div className='stats-header'>User Stats</div>
      <div className='stat'>
        <div className='stat-title'>Correct</div>
        <div className='correct-win-rate'>23/26 of the time</div>
      </div>
      <div className='stat'></div>
    </div>
  );
};
