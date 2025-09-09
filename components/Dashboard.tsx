import { BarChart3, FileText, Clock, Hash } from 'lucide-react';
import { useNotesStats } from '@/hooks/useNotesStats';
import Card from './ui/Card';
import NotesChart from './NotesChart';

const Dashboard: React.FC = () => {
  const { stats, chartData, isLoading, error } = useNotesStats();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600">Error loading dashboard data. Please try again.</p>
        </div>
      </div>
    );
  }

  const kpiCards = [
    {
      title: 'Total Notes',
      value: stats.totalNotes,
      icon: FileText,
      description: 'All notes in your collection',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'This Week',
      value: stats.notesThisWeek,
      icon: Clock,
      description: 'Notes created this week',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Most Used Word',
      value: stats.mostFrequentWord,
      icon: Hash,
      description: 'Most frequent word in notes',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your note-taking activity</p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-1 w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-48"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </Card>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiCards.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                      <Icon className={`w-6 h-6 ${kpi.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {kpi.title}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {typeof kpi.value === 'string' ? kpi.value : kpi.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {stats.longestNote && (
            <Card className="p-6">
              <div className="flex items-start space-x-3">
                <div className="p-3 rounded-lg bg-orange-50">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Longest Note
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {stats.longestNote.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.longestNote.content.length} characters
                  </p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {stats.longestNote.content}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-lg bg-indigo-50">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Notes Created Over Time
                </h3>
                <p className="text-sm text-gray-500">
                  Daily note creation for the past 14 days
                </p>
              </div>
            </div>
            <NotesChart data={chartData} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;