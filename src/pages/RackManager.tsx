import { useState } from "react";
import { Button, Input, Select, SelectItem, Chip } from "@nextui-org/react";
import { ArrowLeft, Download, Upload, Grid3x3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CellTable } from "@/components/CellTable";
import { AddCellModal } from "@/components/AddCellModal";
import { ActionModal } from "@/components/ActionModal";

type FilterTab = "all" | "empty" | "reserved" | "full";

const RackManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [identifierFilter, setIdentifierFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<any>(null);

  const handleRowAction = (cell: any) => {
    setSelectedCell(cell);
    setIsActionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-default-50 p-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button isIconOnly variant="light" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary hover:underline cursor-pointer">Tank 3</span>
            <span className="text-default-400">/</span>
            <span className="text-primary hover:underline cursor-pointer">RACK 2</span>
            <span className="text-default-400">/</span>
            <span className="font-semibold text-2xl">10</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Chip color="primary" variant="flat" size="lg">
            81 cellules
          </Chip>
          <Button variant="bordered" startContent={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button variant="bordered" startContent={<Upload className="h-4 w-4" />}>
            Import
          </Button>
          <Button variant="bordered" startContent={<Grid3x3 className="h-4 w-4" />}>
            Sélection multiples
          </Button>
          <Button variant="bordered" isDisabled>
            Remplir sélection (0)
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <Button
          color={activeTab === "all" ? "primary" : "default"}
          variant={activeTab === "all" ? "solid" : "bordered"}
          onClick={() => setActiveTab("all")}
        >
          Toutes (81)
        </Button>
        <Button
          color={activeTab === "empty" ? "secondary" : "default"}
          variant={activeTab === "empty" ? "solid" : "bordered"}
          onClick={() => setActiveTab("empty")}
        >
          Vides (21%)
        </Button>
        <Button
          color={activeTab === "reserved" ? "secondary" : "default"}
          variant={activeTab === "reserved" ? "solid" : "bordered"}
          onClick={() => setActiveTab("reserved")}
        >
          Réservées (0%)
        </Button>
        <Button
          color={activeTab === "full" ? "secondary" : "default"}
          variant={activeTab === "full" ? "solid" : "bordered"}
          onClick={() => setActiveTab("full")}
        >
          Pleines (79%)
        </Button>
      </div>

      {/* Search Filters */}
      <div className="bg-content1 rounded-lg p-4 mb-6 border border-divider">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            label="Identifiant"
            placeholder="Rechercher..."
            value={identifierFilter}
            onChange={(e) => setIdentifierFilter(e.target.value)}
            variant="bordered"
          />
          <Select
            label="Type cellulaire"
            selectedKeys={[typeFilter]}
            onChange={(e) => setTypeFilter(e.target.value)}
            variant="bordered"
          >
            <SelectItem key="all" value="all">Tous</SelectItem>
            <SelectItem key="LB" value="LB">LB</SelectItem>
            <SelectItem key="PBMC" value="PBMC">PBMC</SelectItem>
          </Select>
          <Input
            label="Propriétaire"
            placeholder="Rechercher..."
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            variant="bordered"
          />
        </div>
        <Button
          variant="flat"
          onClick={() => {
            setIdentifierFilter("");
            setTypeFilter("all");
            setOwnerFilter("");
          }}
        >
          Réinitialiser
        </Button>
      </div>

      {/* Table */}
      <CellTable
        onAddCell={() => setIsAddModalOpen(true)}
        onRowAction={handleRowAction}
        identifierFilter={identifierFilter}
        typeFilter={typeFilter}
        ownerFilter={ownerFilter}
        activeTab={activeTab}
      />

      {/* Modals */}
      <AddCellModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      <ActionModal
        open={isActionModalOpen}
        onOpenChange={setIsActionModalOpen}
        cell={selectedCell}
      />
    </div>
  );
};

export default RackManager;
