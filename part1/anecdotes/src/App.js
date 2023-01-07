import { useState } from 'react'

const Button = ({onClick,label}) => <button onClick={onClick}>{label}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1;
    setVotes(copy);
  }

  const maxVotes = Math.max(...votes)
  const mostVoted = votes.indexOf(maxVotes);

// console.log(selected)
// console.log(votes)
  return (
    <>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}

      <div>has { votes[selected] } votes</div>
      <Button onClick={addVote} label='vote' />
      <Button onClick={getRandom} label='next anecdote' />

      <h2>Anecdote with most votes</h2>
      { maxVotes > 0 ? anecdotes[mostVoted] : 'No votes yet!'}
      { maxVotes > 0 && <div>has {votes[mostVoted]} votes</div>}

    </>
  )
}

export default App
