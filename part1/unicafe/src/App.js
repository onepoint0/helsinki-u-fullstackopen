import { useState } from 'react'

const Button = ({clickHandler,label}) => <button onClick={clickHandler}>{label}</button>

const StatisticLine = ({name,value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({good,bad,neutral}) => {
  const all = good + bad + neutral; 
console.log('all ',all)
  // formula for avg: good = 1, neutral = 0, bad = -1 -> (good - bad / all)
  const avg = (good - bad)/all;
  const pos = (good / all * 100) + ' %';

  if (all === 0) return <div>No feedback given</div>

  return (
    <>
      <table>
        <tbody>
          <StatisticLine name='good' value={good} />
          <StatisticLine name='neutral' value={neutral} />
          <StatisticLine name='bad' value={bad} />
          <StatisticLine name='all' value={all} />
          <StatisticLine name='average' value={avg} />
          <StatisticLine name='positive' value={pos}  />
        </tbody>      
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button clickHandler={() => setGood(good+1)} label='good'/>
      <Button clickHandler={() => setNeutral(neutral+1)} label='neutral'/>
      <Button clickHandler={() => setBad(bad+1)} label='bad'/>

      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App;
