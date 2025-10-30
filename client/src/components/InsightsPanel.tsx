import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LightbulbIcon, ListTodo, AlertCircle, TrendingUp } from 'lucide-react';

interface InsightData {
  totalTasks: number;
  openTasks: number;
  dueSoon: number;
  priorityCounts: {
    Low: number;
    Medium: number;
    High: number;
  };
  summary: string;
}

interface InsightsPanelProps {
  insights: InsightData;
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <LightbulbIcon className="w-5 h-5 text-primary" />
          Workload Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <ListTodo className="w-8 h-8 text-primary" />
                <div className="text-3xl font-bold" data-testid="text-open-tasks">
                  {insights.openTasks}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Open Tasks
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <AlertCircle className="w-8 h-8 text-destructive" />
                <div className="text-3xl font-bold" data-testid="text-due-soon">
                  {insights.dueSoon}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Due Soon
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="w-8 h-8 text-chart-2" />
                <div className="text-3xl font-bold" data-testid="text-high-priority">
                  {insights.priorityCounts.High}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  High Priority
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent">
          <CardContent className="p-4">
            <p className="text-base" data-testid="text-summary">
              {insights.summary}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Low</div>
            <div className="text-2xl font-bold" data-testid="text-priority-low">
              {insights.priorityCounts.Low}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <div className="text-2xl font-bold" data-testid="text-priority-medium">
              {insights.priorityCounts.Medium}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">High</div>
            <div className="text-2xl font-bold" data-testid="text-priority-high">
              {insights.priorityCounts.High}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
