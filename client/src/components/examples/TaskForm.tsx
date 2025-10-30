import TaskForm from '../TaskForm';

export default function TaskFormExample() {
  return (
    <TaskForm 
      onTaskCreate={(task) => console.log('Task created:', task)}
    />
  );
}
