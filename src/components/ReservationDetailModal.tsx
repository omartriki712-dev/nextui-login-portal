import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MapPin, FileText } from "lucide-react";

interface Reservation {
  id: string;
  cellId: string;
  location: string;
  reservedBy: string;
  reservedFor: string;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "completed" | "cancelled";
  comment: string;
}

interface ReservationDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
}

export const ReservationDetailModal = ({
  open,
  onOpenChange,
  reservation,
}: ReservationDetailModalProps) => {
  if (!reservation) return null;

  const getStatusBadge = (status: Reservation["status"]) => {
    const variants: Record<Reservation["status"], { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      active: { variant: "default", label: "Active" },
      pending: { variant: "secondary", label: "En attente" },
      completed: { variant: "outline", label: "Terminée" },
      cancelled: { variant: "destructive", label: "Annulée" },
    };
    return variants[status];
  };

  const statusBadge = getStatusBadge(reservation.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Détails de la réservation</DialogTitle>
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* ID and Cell */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">ID Réservation</p>
              <p className="font-semibold">{reservation.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Cellule</p>
              <p className="font-semibold">{reservation.cellId}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Emplacement</p>
              <p className="font-medium">{reservation.location}</p>
            </div>
          </div>

          {/* Reserved by/for */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Réservé par</p>
                <p className="font-medium">{reservation.reservedBy}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Pour</p>
                <p className="font-medium">{reservation.reservedFor}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Période</p>
              <p className="font-medium">
                {reservation.startDate} → {reservation.endDate}
              </p>
            </div>
          </div>

          {/* Comment */}
          {reservation.comment && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Commentaire</p>
              <p className="text-sm">{reservation.comment}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          <Button>Modifier</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
