import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cell: any;
}

export const ActionModal = ({ open, onOpenChange, cell }: ActionModalProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [modifyData, setModifyData] = useState({
    identifier: cell?.id || "",
    cellName: cell?.cellName || "",
    cellType: cell?.type || "",
    cellCount: cell?.cellCount?.toString() || "1",
    sampleCount: cell?.sampleCount?.toString() || "",
    keywords: cell?.keywords || "",
    freezeDate: cell?.freezeDate || "",
    expiryDate: cell?.expiryDate || "",
    owner: cell?.owner || "",
    comment: "",
  });

  const [reservationData, setReservationData] = useState({
    reservedBy: "",
    reservedFor: "",
    reservationDate: "",
    comment: "",
  });

  const handleModify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cellule modifiée avec succès!");
    onOpenChange(false);
  };

  const handleDelete = () => {
    toast.success("Cellule supprimée avec succès!");
    setShowDeleteConfirm(false);
    onOpenChange(false);
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Réservation effectuée avec succès!");
    onOpenChange(false);
  };

  if (!cell) return null;

  if (showDeleteConfirm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation finale</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de supprimer définitivement la cellule {cell.id}. Cette
              action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Actions sur la cellule {cell.id}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="modify">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modify">Modifier</TabsTrigger>
            <TabsTrigger value="delete">Supprimer</TabsTrigger>
            <TabsTrigger value="reserve">Réserver</TabsTrigger>
          </TabsList>

          <TabsContent value="modify">
            <form onSubmit={handleModify} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modify-identifier">Identifiant</Label>
                  <Input
                    id="modify-identifier"
                    value={modifyData.identifier}
                    onChange={(e) =>
                      setModifyData({ ...modifyData, identifier: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modify-cellName">Nom de la cellule</Label>
                  <Input
                    id="modify-cellName"
                    value={modifyData.cellName}
                    onChange={(e) =>
                      setModifyData({ ...modifyData, cellName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modify-cellType">Type cellulaire</Label>
                  <Select
                    value={modifyData.cellType}
                    onValueChange={(value) =>
                      setModifyData({ ...modifyData, cellType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LB">LB</SelectItem>
                      <SelectItem value="PBMC">PBMC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modify-cellCount">Nombre de cellules (10⁶)</Label>
                  <Input
                    id="modify-cellCount"
                    type="number"
                    value={modifyData.cellCount}
                    onChange={(e) =>
                      setModifyData({ ...modifyData, cellCount: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modify-freezeDate">Date de congélation</Label>
                  <Input
                    id="modify-freezeDate"
                    type="date"
                    value={modifyData.freezeDate}
                    onChange={(e) =>
                      setModifyData({ ...modifyData, freezeDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modify-expiryDate">Date d'expiration</Label>
                  <Input
                    id="modify-expiryDate"
                    type="date"
                    value={modifyData.expiryDate}
                    onChange={(e) =>
                      setModifyData({ ...modifyData, expiryDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modify-comment">Commentaire</Label>
                <Textarea
                  id="modify-comment"
                  value={modifyData.comment}
                  onChange={(e) => setModifyData({ ...modifyData, comment: e.target.value })}
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit">Enregistrer les modifications</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="delete">
            <div className="flex flex-col gap-4 py-4 text-center">
              <p className="text-lg">Êtes-vous sûr de vouloir supprimer cette cellule ?</p>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-mono text-sm mb-2">Identifiant: {cell.id}</p>
                  <p className="text-sm">Position: {cell.position}</p>
                  <p className="text-sm">Type: {cell.type}</p>
                </CardContent>
              </Card>
              <p className="text-sm text-destructive">
                Cette action est irréversible et supprimera définitivement toutes les données
                associées.
              </p>
              <div className="flex gap-3 justify-center pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                  Confirmer la suppression
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reserve">
            <form onSubmit={handleReservation} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="reservedBy">Réservée par</Label>
                <Input
                  id="reservedBy"
                  placeholder="Nom de la personne"
                  value={reservationData.reservedBy}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, reservedBy: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservedFor">Réservée pour</Label>
                <Input
                  id="reservedFor"
                  placeholder="Objectif ou projet"
                  value={reservationData.reservedFor}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, reservedFor: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservationDate">Date de réservation</Label>
                <Input
                  id="reservationDate"
                  type="date"
                  value={reservationData.reservationDate}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      reservationDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservation-comment">Commentaire</Label>
                <Textarea
                  id="reservation-comment"
                  placeholder="Notes supplémentaires..."
                  value={reservationData.comment}
                  onChange={(e) =>
                    setReservationData({ ...reservationData, comment: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit">Créer la réservation</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
