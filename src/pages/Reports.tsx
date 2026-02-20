import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Filter, Download, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for reports
const mockReports = [
  {
    id: "RPT-2024-001",
    subjectName: "Rahul Sharma",
    verificationType: "Employment",
    status: "completed",
    trustScore: 92,
    createdAt: "2024-01-15T10:30:00",
    completedAt: "2024-01-15T14:45:00",
  },
  {
    id: "RPT-2024-002",
    subjectName: "Priya Patel",
    verificationType: "Identity",
    status: "completed",
    trustScore: 88,
    createdAt: "2024-01-14T09:00:00",
    completedAt: "2024-01-14T11:30:00",
  },
  {
    id: "RPT-2024-003",
    subjectName: "Amit Kumar",
    verificationType: "Education",
    status: "in_progress",
    trustScore: null,
    createdAt: "2024-01-16T08:15:00",
    completedAt: null,
  },
  {
    id: "RPT-2024-004",
    subjectName: "Sneha Reddy",
    verificationType: "Criminal",
    status: "completed",
    trustScore: 95,
    createdAt: "2024-01-13T14:20:00",
    completedAt: "2024-01-13T18:00:00",
  },
  {
    id: "RPT-2024-005",
    subjectName: "Vikram Singh",
    verificationType: "Address",
    status: "failed",
    trustScore: null,
    createdAt: "2024-01-12T11:00:00",
    completedAt: "2024-01-12T11:45:00",
  },
  {
    id: "RPT-2024-006",
    subjectName: "Ananya Desai",
    verificationType: "Employment",
    status: "completed",
    trustScore: 78,
    createdAt: "2024-01-11T16:30:00",
    completedAt: "2024-01-11T20:15:00",
  },
  {
    id: "RPT-2024-007",
    subjectName: "Karthik Nair",
    verificationType: "Identity",
    status: "pending",
    trustScore: null,
    createdAt: "2024-01-16T12:00:00",
    completedAt: null,
  },
  {
    id: "RPT-2024-008",
    subjectName: "Meera Iyer",
    verificationType: "Education",
    status: "completed",
    trustScore: 85,
    createdAt: "2024-01-10T09:45:00",
    completedAt: "2024-01-10T13:30:00",
  },
];

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesType = typeFilter === "all" || report.verificationType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTrustScoreColor = (score: number | null) => {
    if (score === null) return "text-muted-foreground";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Verification Reports</h1>
                <p className="text-muted-foreground">View and manage all your verification reports</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/run-check">
                <FileText className="mr-2 h-4 w-4" />
                New Verification
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-foreground">{mockReports.length}</div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">
                  {mockReports.filter((r) => r.status === "completed").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">
                  {mockReports.filter((r) => r.status === "in_progress" || r.status === "pending").length}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">
                  {mockReports.filter((r) => r.trustScore !== null).length > 0
                    ? Math.round(
                        mockReports
                          .filter((r) => r.trustScore !== null)
                          .reduce((acc, r) => acc + (r.trustScore || 0), 0) /
                          mockReports.filter((r) => r.trustScore !== null).length
                      )
                    : 0}
                  %
                </div>
                <p className="text-sm text-muted-foreground">Avg Trust Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or report ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Identity">Identity</SelectItem>
                    <SelectItem value="Employment">Employment</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Criminal">Criminal</SelectItem>
                    <SelectItem value="Address">Address</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trust Score</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No reports found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-mono text-sm">{report.id}</TableCell>
                        <TableCell className="font-medium">{report.subjectName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.verificationType}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${getTrustScoreColor(report.trustScore)}`}>
                            {report.trustScore !== null ? `${report.trustScore}%` : "—"}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(report.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to="/report">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            {report.status === "completed" && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination hint */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing {filteredReports.length} of {mockReports.length} reports
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reports;
