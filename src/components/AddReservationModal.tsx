import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddReservationModal = ({ open, onOpenChange }: AddReservationModalProps) => {
  const [formData, setFormData] = useState({
    cellId: "",
    reservedBy: "",
    reservedFor: "",
    startDate: "",
    endDate: "",
    status: "pending",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cellId || !formData.reservedBy || !formData.startDate) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    toast.success("Réservation créée avec succès");
    onOpenChange(false);
    setFormData({
      cellId: "",
      reservedBy: "",
      reservedFor: "",
      startDate: "",
      endDate: "",
      status: "pending",
      comment: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouvelle réservation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cellId">Cellule *</Label>
              <Select
                value={formData.cellId}
                onValueChange={(value) => setFormData({ ...formData, cellId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CELL-A1">CELL-A1</SelectItem>
                  <SelectItem value="CELL-A2">CELL-A2</SelectItem>
                  <SelectItem value="CELL-B1">CELL-B1</SelectItem>
                  <SelectItem value="CELL-B2">CELL-B2</SelectItem>
                  <SelectItem value="CELL-C1">CELL-C1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reservedBy">Réservé par *</Label>
              <Input
                id="reservedBy"
                value={formData.reservedBy}
                onChange={(e) => setFormData({ ...formData, reservedBy: e.target.value })}
                placeholder="Nom du demandeur"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reservedFor">Réservé pour</Label>
              <Input
                id="reservedFor"
                value={formData.reservedFor}
                onChange={(e) => setFormData({ ...formData, reservedFor: e.target.value })}
                placeholder="Projet ou étude"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Notes ou informations supplémentaires..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer la réservation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
