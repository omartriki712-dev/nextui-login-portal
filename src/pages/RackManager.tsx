import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Upload, Grid3x3, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CellTable } from "@/components/CellTable";
import { CellGrid } from "@/components/CellGrid";
import { AddCellModal } from "@/components/AddCellModal";
import { ActionModal } from "@/components/ActionModal";

type FilterTab = "all" | "empty" | "reserved" | "full";
type ViewMode = "table" | "grid";

const RackManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [identifierFilter, setIdentifierFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<any>(null);

  const handleCellAction = (cell: any) => {
    setSelectedCell(cell);
    setIsActionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
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

        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="default" className="text-sm px-3 py-1">
            81 cellules
          </Badge>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" disabled>
            Remplir sélection (0)
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          onClick={() => setActiveTab("all")}
        >
          Toutes (81)
        </Button>
        <Button
          variant={activeTab === "empty" ? "secondary" : "outline"}
          onClick={() => setActiveTab("empty")}
        >
          Vides (21%)
        </Button>
        <Button
          variant={activeTab === "reserved" ? "secondary" : "outline"}
          onClick={() => setActiveTab("reserved")}
        >
          Réservées (0%)
        </Button>
        <Button
          variant={activeTab === "full" ? "secondary" : "outline"}
          onClick={() => setActiveTab("full")}
        >
          Pleines (79%)
        </Button>
      </div>

      {/* Search Filters */}
      <div className="bg-card rounded-lg p-4 mb-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Identifiant</label>
            <Input
              placeholder="Rechercher..."
              value={identifierFilter}
              onChange={(e) => setIdentifierFilter(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type cellulaire</label>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Propriétaire</label>
            <Input
              placeholder="Rechercher..."
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            setIdentifierFilter("");
            setTypeFilter("all");
            setOwnerFilter("");
          }}
        >
          Réinitialiser
        </Button>
      </div>

      {/* Table or Grid View */}
      {viewMode === "table" ? (
        <CellTable
          onAddCell={() => setIsAddModalOpen(true)}
          onRowAction={handleCellAction}
          identifierFilter={identifierFilter}
          typeFilter={typeFilter}
          ownerFilter={ownerFilter}
          activeTab={activeTab}
        />
      ) : (
        <CellGrid
          onAddCell={() => setIsAddModalOpen(true)}
          onCellClick={handleCellAction}
          activeTab={activeTab}
          rows={9}
          cols={9}
        />
      )}

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
