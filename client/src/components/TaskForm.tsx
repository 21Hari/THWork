import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onTaskCreate?: (task: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => void;
}

export default function TaskForm({ onTaskCreate }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !dueDate) {
      console.log('Validation failed: title and due date required');
      return;
    }

    const task = { title, description, priority, dueDate };
    console.log('Creating task:', task);
    
    if (onTaskCreate) {
      onTaskCreate(task);
    }

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-xl">Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs uppercase tracking-wide font-semibold">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              data-testid="input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs uppercase tracking-wide font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              data-testid="input-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task description (optional)"
              className="min-h-24 resize-vertical"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-xs uppercase tracking-wide font-semibold">
                Priority <span className="text-destructive">*</span>
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority" data-testid="select-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-xs uppercase tracking-wide font-semibold">
                Due Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dueDate"
                data-testid="input-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" data-testid="button-create-task">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
