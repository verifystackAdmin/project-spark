import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { mockData, Plan } from "@/lib/adminApi";

const AdminPlans = () => {
  const [plans] = useState<Plan[]>(mockData.plans);
  const [search, setSearch] = useState("");

  const filtered = plans.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search plans..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />Create Plan</Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                    <Badge variant={plan.active ? "default" : "secondary"}>{plan.active ? "Active" : "Inactive"}</Badge>
                    <Badge variant="outline">{plan.type}</Badge>
                  </div>
                  <p className="text-slate-500 text-sm mt-1">Code: {plan.code} • {plan.features.length} features</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{plan.price}</p>
                    <p className="text-xs text-slate-500">{plan.billingPeriod || "One-time"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon"><Edit className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon">
                      {plan.active ? <ToggleRight className="w-4 h-4 text-green-600" /> : <ToggleLeft className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPlans;
