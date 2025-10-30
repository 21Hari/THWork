import InsightsPanel from '../InsightsPanel';

export default function InsightsPanelExample() {
  //todo: remove mock functionality
  const mockInsights = {
    totalTasks: 8,
    openTasks: 5,
    dueSoon: 3,
    priorityCounts: {
      Low: 2,
      Medium: 3,
      High: 3,
    },
    summary: 'You have 5 open tasks. 3 are due soon. Most tasks are High priority.',
  };

  return <InsightsPanel insights={mockInsights} />;
}
