import { Card, CardBody, Button, Input, Chip, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Grid3x3, Search, Package } from "lucide-react";
import { useState } from "react";

const Boxes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [rackFilter, setRackFilter] = useState("all");

  const boxes = [
    { id: 1, name: "Box 1", rack: "Rack 1", cells: 81, capacity: "79%", status: "active" },
    { id: 2, name: "Box 2", rack: "Rack 2", cells: 81, capacity: "92%", status: "active" },
    { id: 3, name: "Box 3", rack: "Rack 1", cells: 81, capacity: "65%", status: "active" },
    { id: 4, name: "Box 4", rack: "Rack 3", cells: 81, capacity: "88%", status: "active" },
    { id: 5, name: "Box 5", rack: "Rack 2", cells: 81, capacity: "45%", status: "active" },
    { id: 6, name: "Box 6", rack: "Rack 4", cells: 81, capacity: "0%", status: "empty" },
    { id: 7, name: "Box 7", rack: "Rack 3", cells: 81, capacity: "100%", status: "full" },
    { id: 8, name: "Box 8", rack: "Rack 5", cells: 81, capacity: "71%", status: "active" },
    { id: 9, name: "Box 9", rack: "Rack 4", cells: 81, capacity: "55%", status: "active" },
    { id: 10, name: "Box 10", rack: "Rack 6", cells: 81, capacity: "95%", status: "active" },
  ];

  const filteredBoxes = boxes.filter(box => {
    const matchesSearch = box.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         box.rack.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRack = rackFilter === "all" || box.rack === rackFilter;
    return matchesSearch && matchesRack;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "full": return "warning";
      case "empty": return "default";
      default: return "default";
    }
  };

  const racks = ["all", "Rack 1", "Rack 2", "Rack 3", "Rack 4", "Rack 5", "Rack 6"];

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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Gestion des Boxes
              </h1>
              <p className="text-default-600 mt-1">Gérez toutes vos boxes de stockage</p>
            </div>
          </div>
          <Button color="success" variant="shadow" startContent={<Plus className="h-5 w-5" />}>
            Nouvelle Box
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Rechercher une box..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="h-4 w-4 text-default-400" />}
            variant="bordered"
            size="lg"
          />
          <Select
            label="Filtrer par Rack"
            selectedKeys={[rackFilter]}
            onChange={(e) => setRackFilter(e.target.value)}
            variant="bordered"
            startContent={<Package className="h-4 w-4" />}
          >
            {racks.map((rack) => (
              <SelectItem key={rack} value={rack}>
                {rack === "all" ? "Tous les racks" : rack}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Total Boxes</p>
              <p className="text-3xl font-bold">{boxes.length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Actives</p>
              <p className="text-3xl font-bold text-success">{boxes.filter(b => b.status === "active").length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Pleines</p>
              <p className="text-3xl font-bold text-warning">{boxes.filter(b => b.status === "full").length}</p>
            </CardBody>
          </Card>
          <Card className="border-none shadow-lg">
            <CardBody className="p-4">
              <p className="text-small text-default-500">Vides</p>
              <p className="text-3xl font-bold text-default-400">{boxes.filter(b => b.status === "empty").length}</p>
            </CardBody>
          </Card>
        </div>

        {/* Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoxes.map((box) => (
            <Card
              key={box.id}
              isPressable
              className="border-none shadow-lg hover:shadow-xl transition-all"
              onPress={() => navigate("/rack-manager")}
            >
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                    <Grid3x3 className="h-8 w-8 text-white" />
                  </div>
                  <Chip color={getStatusColor(box.status) as any} variant="flat" size="sm">
                    {box.status}
                  </Chip>
                </div>
                <h3 className="text-2xl font-bold mb-2">{box.name}</h3>
                <p className="text-default-500 text-small mb-4">{box.rack}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-600">Cellules:</span>
                    <span className="font-semibold">{box.cells}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-default-600">Capacité:</span>
                    <span className="font-semibold">{box.capacity}</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: box.capacity }}
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

export default Boxes;
