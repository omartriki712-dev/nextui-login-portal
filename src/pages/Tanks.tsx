import { Card, CardBody, Button, Input, Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Server, Search } from "lucide-react";
import { useState } from "react";

const Tanks = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const tanks = [
    { id: 1, name: "Tank 1", location: "Zone A", racks: 12, capacity: "80%", status: "active" },
    { id: 2, name: "Tank 2", location: "Zone A", racks: 10, capacity: "65%", status: "active" },
    { id: 3, name: "Tank 3", location: "Zone B", racks: 8, capacity: "92%", status: "active" },
    { id: 4, name: "Tank 4", location: "Zone B", racks: 15, capacity: "45%", status: "active" },
    { id: 5, name: "Tank 5", location: "Zone C", racks: 3, capacity: "100%", status: "full" },
    { id: 6, name: "Tank 6", location: "Zone C", racks: 0, capacity: "0%", status: "empty" },
  ];

  const filteredTanks = tanks.filter(tank =>
    tank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tank.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "full": return "warning";
      case "empty": return "default";
      default: return "default";
    }
  };

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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Gestion des Tanks
              </h1>
              <p className="text-default-600 mt-1">Gérez tous vos tanks de stockage</p>
            </div>
          </div>
          <Button color="primary" variant="shadow" startContent={<Plus className="h-5 w-5" />}>
            Nouveau Tank
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Rechercher un tank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="h-4 w-4 text-default-400" />}
            variant="bordered"
            size="lg"
          />
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Total Tanks</p>
              <p className="text-3xl font-bold">{tanks.length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Actifs</p>
              <p className="text-3xl font-bold text-success">{tanks.filter(t => t.status === "active").length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Pleins</p>
              <p className="text-3xl font-bold text-warning">{tanks.filter(t => t.status === "full").length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Vides</p>
              <p className="text-3xl font-bold text-default-400">{tanks.filter(t => t.status === "empty").length}</p>
            </CardBody>
          </Card>
        </div>

        {/* Tanks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTanks.map((tank) => (
            <Card
              key={tank.id}
              isPressable
              className="border-none shadow-lg hover:shadow-xl transition-all"
              onPress={() => navigate("/racks")}
            >
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Server className="h-8 w-8 text-white" />
                  </div>
                  <Chip color={getStatusColor(tank.status) as any} variant="flat" size="sm">
                    {tank.status}
                  </Chip>
                </div>
                <h3 className="text-2xl font-bold mb-2">{tank.name}</h3>
                <p className="text-default-500 text-small mb-4">{tank.location}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-600">Racks:</span>
                    <span className="font-semibold">{tank.racks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-600">Capacité:</span>
                    <span className="font-semibold">{tank.capacity}</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: tank.capacity }}
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

export default Tanks;
