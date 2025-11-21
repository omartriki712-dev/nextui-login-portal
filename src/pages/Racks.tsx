import { Card, CardBody, Button, Input, Chip, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Package, Search, Server } from "lucide-react";
import { useState } from "react";

const Racks = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tankFilter, setTankFilter] = useState("all");

  const racks = [
    { id: 1, name: "Rack 1", tank: "Tank 1", boxes: 27, capacity: "75%", status: "active" },
    { id: 2, name: "Rack 2", tank: "Tank 3", boxes: 10, capacity: "92%", status: "active" },
    { id: 3, name: "Rack 3", tank: "Tank 1", boxes: 15, capacity: "60%", status: "active" },
    { id: 4, name: "Rack 4", tank: "Tank 2", boxes: 20, capacity: "85%", status: "active" },
    { id: 5, name: "Rack 5", tank: "Tank 2", boxes: 12, capacity: "40%", status: "active" },
    { id: 6, name: "Rack 6", tank: "Tank 4", boxes: 0, capacity: "0%", status: "empty" },
    { id: 7, name: "Rack 7", tank: "Tank 3", boxes: 18, capacity: "95%", status: "active" },
    { id: 8, name: "Rack 8", tank: "Tank 4", boxes: 30, capacity: "100%", status: "full" },
  ];

  const filteredRacks = racks.filter(rack => {
    const matchesSearch = rack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rack.tank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTank = tankFilter === "all" || rack.tank === tankFilter;
    return matchesSearch && matchesTank;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "full": return "warning";
      case "empty": return "default";
      default: return "default";
    }
  };

  const tanks = ["all", "Tank 1", "Tank 2", "Tank 3", "Tank 4"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-default-50 to-default-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button isIconOnly variant="light" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Gestion des Racks
              </h1>
              <p className="text-default-600 mt-1">Gérez tous vos racks de stockage</p>
            </div>
          </div>
          <Button color="secondary" variant="shadow" startContent={<Plus className="h-5 w-5" />}>
            Nouveau Rack
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Rechercher un rack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="h-4 w-4 text-default-400" />}
            variant="bordered"
            size="lg"
          />
          <Select
            label="Filtrer par Tank"
            selectedKeys={[tankFilter]}
            onChange={(e) => setTankFilter(e.target.value)}
            variant="bordered"
            startContent={<Server className="h-4 w-4" />}
          >
            {tanks.map((tank) => (
              <SelectItem key={tank} value={tank}>
                {tank === "all" ? "Tous les tanks" : tank}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Total Racks</p>
              <p className="text-3xl font-bold">{racks.length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Actifs</p>
              <p className="text-3xl font-bold text-success">{racks.filter(r => r.status === "active").length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Pleins</p>
              <p className="text-3xl font-bold text-warning">{racks.filter(r => r.status === "full").length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Vides</p>
              <p className="text-3xl font-bold text-default-400">{racks.filter(r => r.status === "empty").length}</p>
            </CardBody>
          </Card>
        </div>

        {/* Racks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRacks.map((rack) => (
            <Card
              key={rack.id}
              isPressable
              className="border-none shadow-lg hover:shadow-xl transition-all"
              onPress={() => navigate("/boxes")}
            >
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <Chip color={getStatusColor(rack.status) as any} variant="flat" size="sm">
                    {rack.status}
                  </Chip>
                </div>
                <h3 className="text-2xl font-bold mb-2">{rack.name}</h3>
                <p className="text-default-500 text-small mb-4">{rack.tank}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-600">Boxes:</span>
                    <span className="font-semibold">{rack.boxes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-600">Capacité:</span>
                    <span className="font-semibold">{rack.capacity}</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: rack.capacity }}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Racks;
