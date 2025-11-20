import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
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
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Cellules occupées ({filteredCells.length})</h2>
        <Button color="success" startContent={<Plus className="h-4 w-4" />} onClick={onAddCell}>
          Ajouter une cellule
        </Button>
      </CardHeader>
      <CardBody className="overflow-x-auto">
        <Table aria-label="Cell management table" isStriped>
          <TableHeader>
            <TableColumn>IDENTIFIANT</TableColumn>
            <TableColumn>POSITION</TableColumn>
            <TableColumn>NOM DE LA CELLULE</TableColumn>
            <TableColumn>ÉTAT DE LA CASE</TableColumn>
            <TableColumn>TYPE CELLULAIRE</TableColumn>
            <TableColumn>NOMBRE DE CELLULES (10⁶)</TableColumn>
            <TableColumn>NOMBRE D'ÉCHANTILLONS /PATIENT</TableColumn>
            <TableColumn>MOTS CLÉS</TableColumn>
            <TableColumn>DATE DE CONGÉLATION</TableColumn>
            <TableColumn>DATE D'EXPIRATION</TableColumn>
            <TableColumn>PROPRIÉTAIRE</TableColumn>
            <TableColumn>RÉSERVÉE PAR</TableColumn>
            <TableColumn>RÉSERVÉE POUR</TableColumn>
            <TableColumn>UTILISATEUR</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredCells.map((cell, index) => (
              <TableRow
                key={`${cell.id}-${index}`}
                className="cursor-pointer hover:bg-default-100"
                onClick={() => onRowAction(cell)}
              >
                <TableCell className="font-mono text-xs">{cell.id}</TableCell>
                <TableCell>
                  <Chip color="primary" variant="flat" size="sm">
                    {cell.position}
                  </Chip>
                </TableCell>
                <TableCell>{cell.cellName}</TableCell>
                <TableCell>
                  <Chip color="danger" size="sm">
                    {cell.status}
                  </Chip>
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
      </CardBody>
    </Card>
  );
};
