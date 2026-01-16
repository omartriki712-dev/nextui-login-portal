import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, List, Grid3x3 } from "lucide-react";

interface CellGridProps {
  onAddCell: () => void;
  onCellClick: (cell: any) => void;
  activeTab: string;
  rows?: number;
  cols?: number;
}

// Generate mock cells for the grid
const generateGridCells = (rows: number, cols: number) => {
  const cells = [];
  const statuses = ["Pleine", "Vide", "Réservée"];
  const types = ["LB", "PBMC"];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const position = row * cols + col + 1;
      const random = Math.random();
      let status = "Vide";
      if (random > 0.21) status = "Pleine";
      if (random > 0.95) status = "Réservée";
      
      cells.push({
        id: `900${position.toString().padStart(3, "0")}${Math.floor(Math.random() * 999999).toString().padStart(6, "0")}`,
        position,
        row: row + 1,
        col: col + 1,
        cellName: status === "Vide" ? "—" : `Cell-${position}`,
        status,
        type: types[Math.floor(Math.random() * types.length)],
        cellCount: status === "Vide" ? 0 : Math.floor(Math.random() * 100) + 50,
        sampleCount: status === "Vide" ? 0 : Math.floor(Math.random() * 15) + 1,
        freezeDate: status === "Vide" ? "—" : "2024-04-16",
        owner: "—",
        reservedBy: status === "Réservée" ? "Dr. Martin" : "-",
        user: "Super Admin",
      });
    }
  }
  return cells;
};

export const CellGrid = ({
  onAddCell,
  onCellClick,
  activeTab,
  rows = 9,
  cols = 9,
}: CellGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const cells = generateGridCells(rows, cols);

  const filteredCells = cells.filter((cell) => {
    if (activeTab === "empty" && cell.status !== "Vide") return false;
    if (activeTab === "reserved" && cell.status !== "Réservée") return false;
    if (activeTab === "full" && cell.status !== "Pleine") return false;
    return true;
  });

  const getCellColor = (status: string) => {
    switch (status) {
      case "Pleine":
        return "bg-destructive/80 hover:bg-destructive text-destructive-foreground";
      case "Vide":
        return "bg-muted hover:bg-muted/80 text-muted-foreground border-2 border-dashed border-muted-foreground/30";
      case "Réservée":
        return "bg-warning hover:bg-warning/90 text-warning-foreground";
      default:
        return "bg-muted";
    }
  };

  const stats = {
    total: cells.length,
    full: cells.filter((c) => c.status === "Pleine").length,
    empty: cells.filter((c) => c.status === "Vide").length,
    reserved: cells.filter((c) => c.status === "Réservée").length,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <CardTitle>Grille des cellules ({filteredCells.length})</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="destructive">{stats.full} Pleines</Badge>
            <Badge variant="secondary">{stats.empty} Vides</Badge>
            <Badge variant="warning">{stats.reserved} Réservées</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="success" onClick={onAddCell}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une cellule
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "grid" ? (
          <div className="overflow-x-auto">
            {/* Column headers */}
            <div className="flex gap-1 mb-1 pl-8">
              {Array.from({ length: cols }, (_, i) => (
                <div
                  key={i}
                  className="w-12 h-6 flex items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            
            {/* Grid rows */}
            {Array.from({ length: rows }, (_, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 mb-1">
                {/* Row header */}
                <div className="w-6 h-12 flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {String.fromCharCode(65 + rowIndex)}
                </div>
                
                {/* Cells */}
                {Array.from({ length: cols }, (_, colIndex) => {
                  const cell = cells.find(
                    (c) => c.row === rowIndex + 1 && c.col === colIndex + 1
                  );
                  
                  if (!cell) return null;

                  // Check if cell matches filter
                  const matchesFilter =
                    activeTab === "all" ||
                    (activeTab === "empty" && cell.status === "Vide") ||
                    (activeTab === "reserved" && cell.status === "Réservée") ||
                    (activeTab === "full" && cell.status === "Pleine");

                  return (
                    <button
                      key={colIndex}
                      onClick={() => onCellClick(cell)}
                      className={cn(
                        "w-12 h-12 rounded-md flex flex-col items-center justify-center text-xs font-medium transition-all",
                        getCellColor(cell.status),
                        !matchesFilter && "opacity-30"
                      )}
                      title={`Position ${cell.position} - ${cell.status}`}
                    >
                      <span className="font-bold">{cell.position}</span>
                      {cell.status === "Pleine" && (
                        <span className="text-[10px]">{cell.type}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            
            {/* Legend */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Légende:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive/80" />
                <span className="text-xs">Pleine</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted border-2 border-dashed border-muted-foreground/30" />
                <span className="text-xs">Vide</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-warning" />
                <span className="text-xs">Réservée</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Basculez vers la vue tableau pour la liste détaillée.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
