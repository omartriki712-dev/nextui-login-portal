import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Package, Search, Server } from "lucide-react";
import { useState } from "react";
import { AddRackModal } from "@/components/AddRackModal";

const Racks = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tankFilter, setTankFilter] = useState("all");

  const racks = [
    { id: 1, name: "Rack 1", tank: "Tank 1", boxes: 27, capacity: 75, status: "active" },
    { id: 2, name: "Rack 2", tank: "Tank 3", boxes: 10, capacity: 92, status: "active" },
    { id: 3, name: "Rack 3", tank: "Tank 1", boxes: 15, capacity: 60, status: "active" },
    { id: 4, name: "Rack 4", tank: "Tank 2", boxes: 20, capacity: 85, status: "active" },
    { id: 5, name: "Rack 5", tank: "Tank 2", boxes: 12, capacity: 40, status: "active" },
    { id: 6, name: "Rack 6", tank: "Tank 4", boxes: 0, capacity: 0, status: "empty" },
    { id: 7, name: "Rack 7", tank: "Tank 3", boxes: 18, capacity: 95, status: "active" },
    { id: 8, name: "Rack 8", tank: "Tank 4", boxes: 30, capacity: 100, status: "full" },
  ];

  const filteredRacks = racks.filter(rack => {
    const matchesSearch = rack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rack.tank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTank = tankFilter === "all" || rack.tank === tankFilter;
    return matchesSearch && matchesTank;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "full": return "warning";
      case "empty": return "secondary";
      default: return "secondary";
    }
  };

  const tanks = ["all", "Tank 1", "Tank 2", "Tank 3", "Tank 4"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-muted/50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Gestion des Racks
              </h1>
              <p className="text-muted-foreground mt-1">Gérez tous vos racks de stockage</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Nouveau Rack
          </Button>
        </div>

        <AddRackModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un rack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={tankFilter} onValueChange={setTankFilter}>
            <SelectTrigger className="h-12">
              <Server className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrer par Tank" />
            </SelectTrigger>
            <SelectContent>
              {tanks.map((tank) => (
                <SelectItem key={tank} value={tank}>
                  {tank === "all" ? "Tous les tanks" : tank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Racks</p>
              <p className="text-3xl font-bold">{racks.length}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Actifs</p>
              <p className="text-3xl font-bold text-green-500">{racks.filter(r => r.status === "active").length}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Pleins</p>
              <p className="text-3xl font-bold text-orange-500">{racks.filter(r => r.status === "full").length}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Vides</p>
              <p className="text-3xl font-bold text-gray-400">{racks.filter(r => r.status === "empty").length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Racks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRacks.map((rack) => (
            <Card
              key={rack.id}
              className="border-none shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => navigate("/boxes")}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant={getStatusVariant(rack.status) as any}>
                    {rack.status}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">{rack.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{rack.tank}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Boxes:</span>
                    <span className="font-semibold">{rack.boxes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Capacité:</span>
                    <span className="font-semibold">{rack.capacity}%</span>
                  </div>
                  <Progress value={rack.capacity} className="h-2 mt-2" indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Racks;
