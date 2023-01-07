const Header = ({course}) => <h1>{course}</h1>;

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = (props) => {
  return (
    <>
      {/* {props.parts.map( (part, idx) => <Part key={idx} name={part.name} exercises={part.exercises} />)} */}
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} /> 
    </>
  );
};

// const total = props.parts.reduce( (sum,{exercises}) => sum + exercises, 0 );
const Total = (props) => <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} /> 
    </div>
  );
};

export default App;
