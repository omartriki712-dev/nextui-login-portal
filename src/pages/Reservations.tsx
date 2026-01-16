import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Search, Calendar, Trash2, Edit, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddReservationModal } from "@/components/AddReservationModal";
import { ReservationDetailModal } from "@/components/ReservationDetailModal";

type ReservationStatus = "active" | "pending" | "completed" | "cancelled";

interface Reservation {
  id: string;
  cellId: string;
  location: string;
  reservedBy: string;
  reservedFor: string;
  startDate: string;
  endDate: string;
  status: ReservationStatus;
  comment: string;
}

const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    cellId: "CELL-A1",
    location: "Tank 1 > Rack 2 > Box 3",
    reservedBy: "Dr. Martin",
    reservedFor: "Projet Alpha",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active",
    comment: "Échantillons pour analyse ADN",
  },
  {
    id: "RES-002",
    cellId: "CELL-B5",
    location: "Tank 2 > Rack 1 > Box 1",
    reservedBy: "Dr. Dupont",
    reservedFor: "Étude clinique",
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    status: "pending",
    comment: "En attente de validation",
  },
  {
    id: "RES-003",
    cellId: "CELL-C3",
    location: "Tank 1 > Rack 4 > Box 2",
    reservedBy: "Dr. Bernard",
    reservedFor: "Recherche PBMC",
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    status: "completed",
    comment: "Terminé avec succès",
  },
  {
    id: "RES-004",
    cellId: "CELL-D7",
    location: "Tank 3 > Rack 2 > Box 5",
    reservedBy: "Dr. Leroy",
    reservedFor: "Test qualité",
    startDate: "2024-01-18",
    endDate: "2024-02-01",
    status: "cancelled",
    comment: "Annulé - échantillon non disponible",
  },
  {
    id: "RES-005",
    cellId: "CELL-E2",
    location: "Tank 2 > Rack 3 > Box 4",
    reservedBy: "Dr. Martin",
    reservedFor: "Projet Beta",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    status: "active",
    comment: "Suivi mensuel",
  },
];

const Reservations = () => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const getStatusBadge = (status: ReservationStatus) => {
    const variants: Record<ReservationStatus, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      active: { variant: "default", label: "Active" },
      pending: { variant: "secondary", label: "En attente" },
      completed: { variant: "outline", label: "Terminée" },
      cancelled: { variant: "destructive", label: "Annulée" },
    };
    return variants[status];
  };

  const filteredReservations = mockReservations.filter((reservation) => {
    const matchesSearch =
      reservation.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      reservation.cellId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      reservation.reservedBy.toLowerCase().includes(searchFilter.toLowerCase()) ||
      reservation.reservedFor.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockReservations.length,
    active: mockReservations.filter((r) => r.status === "active").length,
    pending: mockReservations.filter((r) => r.status === "pending").length,
    completed: mockReservations.filter((r) => r.status === "completed").length,
  };

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Réservations</h1>
            <p className="text-muted-foreground">Gérez les réservations de cellules</p>
          </div>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle réservation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Actives</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Calendar className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Terminées</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID, cellule, réservé par..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchFilter("");
                setStatusFilter("all");
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Liste des réservations</span>
            <Badge variant="secondary">{filteredReservations.length} résultat(s)</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cellule</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Réservé par</TableHead>
                <TableHead>Pour</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => {
                const statusBadge = getStatusBadge(reservation.status);
                return (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.id}</TableCell>
                    <TableCell>{reservation.cellId}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {reservation.location}
                    </TableCell>
                    <TableCell>{reservation.reservedBy}</TableCell>
                    <TableCell>{reservation.reservedFor}</TableCell>
                    <TableCell className="text-sm">
                      <div>{reservation.startDate}</div>
                      <div className="text-muted-foreground">→ {reservation.endDate}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewReservation(reservation)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredReservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucune réservation trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddReservationModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      <ReservationDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        reservation={selectedReservation}
      />
    </div>
  );
};

export default Reservations;
