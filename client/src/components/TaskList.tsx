import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Flag, Circle, Clock, CheckCircle2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Done';
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate?: (id: number, updates: Partial<Task>) => void;
}

export default function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      case 'Medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-chart-2 text-white';
      case 'In Progress':
        return 'bg-chart-4 text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Task Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status-filter" className="text-xs uppercase tracking-wide font-semibold">
                Filter by Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" data-testid="select-status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority-filter" className="text-xs uppercase tracking-wide font-semibold">
                Filter by Priority
              </Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger id="priority-filter" data-testid="select-priority-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No tasks found. Create your first task to get started!</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover-elevate" data-testid={`card-task-${task.id}`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-base flex-1" data-testid={`text-task-title-${task.id}`}>
                      {task.title}
                    </h3>
                    <Badge className={`${getStatusColor(task.status)} text-xs`} data-testid={`badge-status-${task.id}`}>
                      {getStatusIcon(task.status)}
                      <span className="ml-1">{task.status}</span>
                    </Badge>
                  </div>

                  {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${task.id}`}>
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                      <Flag className="w-3 h-3 mr-1" />
                      {task.priority}
                    </Badge>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span data-testid={`text-due-date-${task.id}`}>{task.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <Select
                        value={task.status}
                        onValueChange={(value) => {
                          console.log(`Updating task ${task.id} status to:`, value);
                          onTaskUpdate?.(task.id, { status: value as Task['status'] });
                        }}
                      >
                        <SelectTrigger className="h-8 w-32" data-testid={`select-update-status-${task.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={task.priority}
                        onValueChange={(value) => {
                          console.log(`Updating task ${task.id} priority to:`, value);
                          onTaskUpdate?.(task.id, { priority: value as Task['priority'] });
                        }}
                      >
                        <SelectTrigger className="h-8 w-32" data-testid={`select-update-priority-${task.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
