import { useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import InsightsPanel from '@/components/InsightsPanel';
import { CheckSquare } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Done';
}

export default function Home() {
  //todo: remove mock functionality - replace with API calls
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Finish writing the project proposal document and send it to the team for review',
      priority: 'High',
      dueDate: '2025-11-05',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Update documentation',
      description: 'Review and update the API documentation with new endpoints',
      priority: 'Medium',
      dueDate: '2025-11-10',
      status: 'Open',
    },
    {
      id: 3,
      title: 'Fix bug in login flow',
      description: 'Users are experiencing issues when logging in with special characters',
      priority: 'High',
      dueDate: '2025-11-02',
      status: 'Done',
    },
    {
      id: 4,
      title: 'Design new landing page',
      description: '',
      priority: 'Low',
      dueDate: '2025-11-15',
      status: 'Open',
    },
    {
      id: 5,
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for quarterly team meeting',
      priority: 'Medium',
      dueDate: '2025-11-03',
      status: 'In Progress',
    },
  ]);

  const handleTaskCreate = (newTask: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => {
    const task: Task = {
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority as Task['priority'],
      dueDate: newTask.dueDate,
      status: 'Open',
    };

    setTasks([...tasks, task]);
    console.log('Task created successfully:', task);
  };

  const handleTaskUpdate = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
    console.log('Task updated:', id, updates);
  };

  const calculateInsights = () => {
    const openTasks = tasks.filter(t => t.status === 'Open').length;
    
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    
    const dueSoon = tasks.filter(t => {
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate <= threeDaysFromNow && t.status !== 'Done';
    }).length;

    const priorityCounts = {
      Low: tasks.filter(t => t.priority === 'Low').length,
      Medium: tasks.filter(t => t.priority === 'Medium').length,
      High: tasks.filter(t => t.priority === 'High').length,
    };

    let dominant = 'Medium';
    if (priorityCounts.High > priorityCounts.Medium && priorityCounts.High > priorityCounts.Low) {
      dominant = 'High';
    } else if (priorityCounts.Low > priorityCounts.Medium && priorityCounts.Low > priorityCounts.High) {
      dominant = 'Low';
    }

    const summary = `You have ${openTasks} open task${openTasks !== 1 ? 's' : ''}. ${dueSoon} ${dueSoon !== 1 ? 'are' : 'is'} due soon. Most tasks are ${dominant} priority.`;

    return {
      totalTasks: tasks.length,
      openTasks,
      dueSoon,
      priorityCounts,
      summary,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-semibold">Task Tracker with Smart Insights</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TaskForm onTaskCreate={handleTaskCreate} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <InsightsPanel insights={calculateInsights()} />
            <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
          </div>
        </div>
      </main>
    </div>
  );
}
