import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Server, Package, Grid3x3, Box, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StatsDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Tanks",
      value: "12",
      icon: Server,
      trend: "+2 ce mois",
      bgGradient: "from-blue-500 to-cyan-500",
      path: "/tanks",
    },
    {
      title: "Racks",
      value: "48",
      icon: Package,
      trend: "+5 ce mois",
      bgGradient: "from-purple-500 to-pink-500",
      path: "/racks",
    },
    {
      title: "Cases",
      value: "324",
      icon: Grid3x3,
      trend: "+12 ce mois",
      bgGradient: "from-green-500 to-emerald-500",
      path: "/boxes",
    },
    {
      title: "Cellules",
      value: "972",
      icon: Box,
      trend: "204 vides",
      bgGradient: "from-orange-500 to-amber-500",
      path: "/rack-manager",
    },
    {
      title: "Réservations",
      value: "45",
      icon: Calendar,
      trend: "8 actives",
      bgGradient: "from-red-500 to-rose-500",
      path: null,
    },
  ];

  const cellBreakdown = [
    { label: "Pleines", value: "768", percentage: 79, color: "bg-green-500" },
    { label: "Vides", value: "204", percentage: 21, color: "bg-gray-400" },
    { label: "Réservées", value: "0", percentage: 0, color: "bg-orange-500" },
  ];

  const recentActivity = [
    { action: "Nouvelle cellule ajoutée", location: "Tank 3 > Rack 2", time: "Il y a 2h" },
    { action: "Réservation confirmée", location: "Tank 1 > Rack 5", time: "Il y a 5h" },
    { action: "Cellule vidée", location: "Tank 2 > Rack 8", time: "Il y a 1j" },
  ];

  const reservationData = [
    { month: "Jan", reservations: 12, completed: 10 },
    { month: "Fév", reservations: 19, completed: 15 },
    { month: "Mar", reservations: 15, completed: 14 },
    { month: "Avr", reservations: 25, completed: 20 },
    { month: "Mai", reservations: 22, completed: 18 },
    { month: "Jun", reservations: 30, completed: 25 },
  ];

  const cellUsageData = [
    { name: "Pleines", value: 768, color: "#10b981" },
    { name: "Vides", value: 204, color: "#6b7280" },
    { name: "Réservées", value: 0, color: "#f59e0b" },
  ];

  const capacityTrendData = [
    { week: "S1", tanks: 65, racks: 70, boxes: 75 },
    { week: "S2", tanks: 68, racks: 72, boxes: 78 },
    { week: "S3", tanks: 70, racks: 75, boxes: 80 },
    { week: "S4", tanks: 72, racks: 77, boxes: 79 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-muted/50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">Vue d'ensemble de votre système de gestion</p>
          </div>
          <Button onClick={() => navigate("/rack-manager")} size="lg">
            Gérer les cellules
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => stat.path && navigate(stat.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold mb-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Reservations Chart */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-destructive" />
                Statistiques de réservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reservationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reservations" fill="#f43f5e" name="Réservations" />
                  <Bar dataKey="completed" fill="#10b981" name="Complétées" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cell Usage Pie Chart */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5 text-primary" />
                Utilisation des cellules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cellUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cellUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Capacity Trend & Cell Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Capacity Trend */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Évolution de la capacité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={capacityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tanks" stroke="#3b82f6" name="Tanks" strokeWidth={2} />
                  <Line type="monotone" dataKey="racks" stroke="#a855f7" name="Racks" strokeWidth={2} />
                  <Line type="monotone" dataKey="boxes" stroke="#10b981" name="Boxes" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cell Breakdown */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5 text-primary" />
                Répartition des cellules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cellBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{item.value}</span>
                        <Badge variant="secondary">{item.percentage}%</Badge>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" indicatorClassName={item.color} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-secondary" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsDashboard;
