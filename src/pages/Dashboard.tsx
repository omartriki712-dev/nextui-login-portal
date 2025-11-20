import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Upload, Grid3x3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CellTable } from "@/components/CellTable";
import { AddCellModal } from "@/components/AddCellModal";
import { ActionModal } from "@/components/ActionModal";

type FilterTab = "all" | "empty" | "reserved" | "full";

const Dashboard = () => {
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
    <div className="min-h-screen bg-background p-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary hover:underline cursor-pointer">Tank 3</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary hover:underline cursor-pointer">RACK 2</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-2xl">10</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="default" className="px-4 py-2 bg-primary text-primary-foreground">
            81 cellules
          </Badge>
          <Button variant="outline" className="text-secondary border-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="text-secondary border-secondary">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="text-secondary border-secondary">
            <Grid3x3 className="h-4 w-4 mr-2" />
            Sélection multiples
          </Button>
          <Button variant="outline" disabled>
            Remplir sélection (0)
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6">
        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          onClick={() => setActiveTab("all")}
          className={activeTab === "all" ? "bg-primary" : ""}
        >
          Toutes (81)
        </Button>
        <Button
          variant={activeTab === "empty" ? "default" : "outline"}
          onClick={() => setActiveTab("empty")}
          className={activeTab === "empty" ? "bg-secondary" : "text-secondary"}
        >
          Vides (21%)
        </Button>
        <Button
          variant={activeTab === "reserved" ? "default" : "outline"}
          onClick={() => setActiveTab("reserved")}
          className={activeTab === "reserved" ? "bg-secondary" : "text-secondary"}
        >
          Réservées (0%)
        </Button>
        <Button
          variant={activeTab === "full" ? "default" : "outline"}
          onClick={() => setActiveTab("full")}
          className={activeTab === "full" ? "bg-secondary" : "text-secondary"}
        >
          Pleines (79%)
        </Button>
      </div>

      {/* Search Filters */}
      <div className="bg-card rounded-lg p-4 mb-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Identifiant</label>
            <Input
              placeholder="Rechercher..."
              value={identifierFilter}
              onChange={(e) => setIdentifierFilter(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Type cellulaire</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="LB">LB</SelectItem>
                <SelectItem value="PBMC">PBMC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Propriétaire</label>
            <Input
              placeholder="Rechercher..."
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="outline"
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

export default Dashboard;
