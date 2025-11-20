import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

interface CellTableProps {
  onAddCell: () => void;
  onRowAction: (cell: any) => void;
  identifierFilter: string;
  typeFilter: string;
  ownerFilter: string;
  activeTab: string;
}

const mockCells = [
  { id: "900433160424", position: 1, cellName: "—", status: "Pleine", type: "LB", cellCount: 88, sampleCount: 3, keywords: "—", freezeDate: "2024-04-16", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900433160424", position: 2, cellName: "—", status: "Pleine", type: "LB", cellCount: 88, sampleCount: 3, keywords: "—", freezeDate: "2024-04-16", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900433160424", position: 3, cellName: "—", status: "Pleine", type: "LB", cellCount: 88, sampleCount: 3, keywords: "—", freezeDate: "2024-04-16", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900208230424", position: 4, cellName: "—", status: "Pleine", type: "PBMC", cellCount: 71, sampleCount: 2, keywords: "—", freezeDate: "2024-04-23", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900208230424", position: 5, cellName: "—", status: "Pleine", type: "PBMC", cellCount: 71, sampleCount: 2, keywords: "—", freezeDate: "2024-04-23", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900208230424", position: 7, cellName: "—", status: "Pleine", type: "LB", cellCount: 79, sampleCount: 2, keywords: "—", freezeDate: "2024-04-23", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900208230424", position: 9, cellName: "—", status: "Pleine", type: "LB", cellCount: 79, sampleCount: 2, keywords: "—", freezeDate: "2024-04-23", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900455240424", position: 10, cellName: "—", status: "Pleine", type: "PBMC", cellCount: 97, sampleCount: 13, keywords: "—", freezeDate: "2024-04-24", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
  { id: "900455240424", position: 11, cellName: "—", status: "Pleine", type: "PBMC", cellCount: 97, sampleCount: 13, keywords: "—", freezeDate: "2024-04-24", expiryDate: "—", owner: "—", reservedBy: "-", reservedFor: "-", user: "Super Admin" },
];

export const CellTable = ({
  onAddCell,
  onRowAction,
  identifierFilter,
  typeFilter,
  ownerFilter,
  activeTab,
}: CellTableProps) => {
  // Filter logic
  let filteredCells = mockCells.filter(cell => {
    if (identifierFilter && !cell.id.includes(identifierFilter)) return false;
    if (typeFilter !== "all" && cell.type !== typeFilter) return false;
    if (ownerFilter && !cell.owner.toLowerCase().includes(ownerFilter.toLowerCase())) return false;
    
    // Tab filtering
    if (activeTab === "empty" && cell.status !== "Vide") return false;
    if (activeTab === "reserved" && cell.reservedBy === "-") return false;
    if (activeTab === "full" && cell.status !== "Pleine") return false;
    
    return true;
  });

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Cellules occupées ({filteredCells.length})</h2>
        <Button onClick={onAddCell} className="bg-success hover:bg-success/90">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une cellule
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identifiant</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Nom de la cellule</TableHead>
              <TableHead>État de la case</TableHead>
              <TableHead>Type cellulaire</TableHead>
              <TableHead>Nombre de cellules (10⁶)</TableHead>
              <TableHead>Nombre d'échantillons /patient</TableHead>
              <TableHead>Mots clés</TableHead>
              <TableHead>Date de congélation</TableHead>
              <TableHead>Date d'expiration</TableHead>
              <TableHead>Propriétaire</TableHead>
              <TableHead>Réservée par</TableHead>
              <TableHead>Réservée pour</TableHead>
              <TableHead>Utilisateur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCells.map((cell, index) => (
              <TableRow
                key={`${cell.id}-${index}`}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowAction(cell)}
              >
                <TableCell className="font-mono text-sm">{cell.id}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-primary border-primary">
                    {cell.position}
                  </Badge>
                </TableCell>
                <TableCell>{cell.cellName}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{cell.status}</Badge>
                </TableCell>
                <TableCell>{cell.type}</TableCell>
                <TableCell className="text-center">{cell.cellCount}</TableCell>
                <TableCell className="text-center">{cell.sampleCount}</TableCell>
                <TableCell>{cell.keywords}</TableCell>
                <TableCell>{cell.freezeDate}</TableCell>
                <TableCell>{cell.expiryDate}</TableCell>
                <TableCell>{cell.owner}</TableCell>
                <TableCell>{cell.reservedBy}</TableCell>
                <TableCell>{cell.reservedFor}</TableCell>
                <TableCell>{cell.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
