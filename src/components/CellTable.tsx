import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  let filteredCells = mockCells.filter((cell) => {
    if (identifierFilter && !cell.id.includes(identifierFilter)) return false;
    if (typeFilter !== "all" && cell.type !== typeFilter) return false;
    if (ownerFilter && !cell.owner.toLowerCase().includes(ownerFilter.toLowerCase()))
      return false;

    if (activeTab === "empty" && cell.status !== "Vide") return false;
    if (activeTab === "reserved" && cell.reservedBy === "-") return false;
    if (activeTab === "full" && cell.status !== "Pleine") return false;

    return true;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Cellules occupées ({filteredCells.length})</CardTitle>
        <Button variant="success" onClick={onAddCell}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une cellule
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IDENTIFIANT</TableHead>
              <TableHead>POSITION</TableHead>
              <TableHead>NOM DE LA CELLULE</TableHead>
              <TableHead>ÉTAT DE LA CASE</TableHead>
              <TableHead>TYPE CELLULAIRE</TableHead>
              <TableHead>NOMBRE DE CELLULES (10⁶)</TableHead>
              <TableHead>NOMBRE D'ÉCHANTILLONS /PATIENT</TableHead>
              <TableHead>MOTS CLÉS</TableHead>
              <TableHead>DATE DE CONGÉLATION</TableHead>
              <TableHead>DATE D'EXPIRATION</TableHead>
              <TableHead>PROPRIÉTAIRE</TableHead>
              <TableHead>RÉSERVÉE PAR</TableHead>
              <TableHead>RÉSERVÉE POUR</TableHead>
              <TableHead>UTILISATEUR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCells.map((cell, index) => (
              <TableRow
                key={`${cell.id}-${index}`}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowAction(cell)}
              >
                <TableCell className="font-mono text-xs">{cell.id}</TableCell>
                <TableCell>
                  <Badge variant="default">
                    {cell.position}
                  </Badge>
                </TableCell>
                <TableCell>{cell.cellName}</TableCell>
                <TableCell>
                  <Badge variant="destructive">
                    {cell.status}
                  </Badge>
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
      </CardContent>
    </Card>
  );
};
