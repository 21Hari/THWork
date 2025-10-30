import TaskList from '../TaskList';

export default function TaskListExample() {
  //todo: remove mock functionality
  const mockTasks = [
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Finish writing the project proposal document and send it to the team for review',
      priority: 'High' as const,
      dueDate: '2025-11-05',
      status: 'In Progress' as const,
    },
    {
      id: 2,
      title: 'Update documentation',
      description: 'Review and update the API documentation with new endpoints',
      priority: 'Medium' as const,
      dueDate: '2025-11-10',
      status: 'Open' as const,
    },
    {
      id: 3,
      title: 'Fix bug in login flow',
      description: '',
      priority: 'High' as const,
      dueDate: '2025-11-02',
      status: 'Done' as const,
    },
  ];

  return (
    <TaskList 
      tasks={mockTasks}
      onTaskUpdate={(id, updates) => console.log('Update task:', id, updates)}
    />
  );
}
