import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockData } from "@/lib/adminApi";

const AdminActivity = () => {
  const [activities] = useState(mockData.activities);

  return (
    <div className="space-y-4">
      {activities.map((a) => (
        <Card key={a.id}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium">{a.userEmail}</p>
              <p className="text-sm text-slate-500">{a.verificationType} • {a.correlationId}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">{a.ipAddress}</span>
              <Badge variant={a.result === "PASS" ? "default" : "destructive"}>{a.result}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminActivity;
