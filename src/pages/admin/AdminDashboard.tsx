import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, BarChart3, AlertTriangle } from "lucide-react";
import { mockData } from "@/lib/adminApi";

const AdminDashboard = () => {
  const [stats] = useState(mockData.stats);
  const [recentActivity] = useState(mockData.recentActivity);

  const statCards = [
    { label: "Total Subscriptions", value: stats.totalSubscriptions.toLocaleString(), icon: Users, color: "text-blue-600 bg-blue-100" },
    { label: "Active Plans", value: stats.activePlans, icon: CreditCard, color: "text-green-600 bg-green-100" },
    { label: "Usage Today", value: stats.usageToday.toLocaleString(), icon: BarChart3, color: "text-purple-600 bg-purple-100" },
    { label: "Errors Today", value: stats.errorCount, icon: AlertTriangle, color: "text-red-600 bg-red-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{log.action}</p>
                  <p className="text-sm text-slate-500">{log.userEmail} • {log.details}</p>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
