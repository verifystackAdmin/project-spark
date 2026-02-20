import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsage = () => (
  <Card>
    <CardHeader><CardTitle>Usage Monitoring</CardTitle></CardHeader>
    <CardContent>
      <p className="text-slate-500">Usage charts and filters will be displayed here.</p>
    </CardContent>
  </Card>
);

export default AdminUsage;
