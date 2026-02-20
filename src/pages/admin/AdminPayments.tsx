import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockData } from "@/lib/adminApi";

const AdminPayments = () => {
  const [payments] = useState(mockData.payments);

  return (
    <div className="space-y-4">
      {payments.map((p) => (
        <Card key={p.id}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium">{p.userEmail}</p>
              <p className="text-sm text-slate-500">{p.gatewayReference}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">₹{p.amount}</span>
              <Badge variant={p.status === "SUCCESS" ? "default" : "destructive"}>{p.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminPayments;
