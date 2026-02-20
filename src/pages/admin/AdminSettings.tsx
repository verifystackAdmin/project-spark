import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => (
  <Card>
    <CardHeader><CardTitle>Admin Settings</CardTitle></CardHeader>
    <CardContent>
      <p className="text-slate-500">System configuration options for super admins.</p>
    </CardContent>
  </Card>
);

export default AdminSettings;
