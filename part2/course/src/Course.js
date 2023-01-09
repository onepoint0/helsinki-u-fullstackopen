const Header = ({ course }) => <h1>{course}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>
  )
}

const Total = ({sum}) => <strong>total of {sum} exercises</strong>

const Course = ({course}) => {

  const sum = course.parts.reduce((tot,{exercises}) => tot+exercises,0)
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={sum}/>
    </>
  )
}
export default Course;