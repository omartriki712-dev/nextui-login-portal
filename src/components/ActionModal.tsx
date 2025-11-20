import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Actions sur la cellule {cell.id}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="modify" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modify">Modifier</TabsTrigger>
              <TabsTrigger value="delete">Supprimer</TabsTrigger>
              <TabsTrigger value="reserve">Réserver</TabsTrigger>
            </TabsList>

            <TabsContent value="modify" className="space-y-4 mt-4">
              <form onSubmit={handleModify} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mod-identifier">Identifiant *</Label>
                    <Input
                      id="mod-identifier"
                      value={modifyData.identifier}
                      onChange={(e) => setModifyData({ ...modifyData, identifier: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mod-cellName">Nom de la cellule</Label>
                    <Input
                      id="mod-cellName"
                      value={modifyData.cellName}
                      onChange={(e) => setModifyData({ ...modifyData, cellName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mod-cellType">Type cellulaire *</Label>
                    <Select
                      value={modifyData.cellType}
                      onValueChange={(value) => setModifyData({ ...modifyData, cellType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LB">LB</SelectItem>
                        <SelectItem value="PBMC">PBMC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mod-cellCount">Nombre de cellules (10⁶)</Label>
                    <Input
                      id="mod-cellCount"
                      type="number"
                      value={modifyData.cellCount}
                      onChange={(e) => setModifyData({ ...modifyData, cellCount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mod-freezeDate">Date de congélation</Label>
                    <Input
                      id="mod-freezeDate"
                      type="date"
                      value={modifyData.freezeDate}
                      onChange={(e) => setModifyData({ ...modifyData, freezeDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mod-expiryDate">Date d'expiration</Label>
                    <Input
                      id="mod-expiryDate"
                      type="date"
                      value={modifyData.expiryDate}
                      onChange={(e) => setModifyData({ ...modifyData, expiryDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mod-comment">Commentaire</Label>
                  <Textarea
                    id="mod-comment"
                    value={modifyData.comment}
                    onChange={(e) => setModifyData({ ...modifyData, comment: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">Enregistrer les modifications</Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="delete" className="space-y-4 mt-4">
              <div className="space-y-4 p-6 text-center">
                <p className="text-lg">Êtes-vous sûr de vouloir supprimer cette cellule ?</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-mono text-sm mb-2">Identifiant: {cell.id}</p>
                  <p className="text-sm">Position: {cell.position}</p>
                  <p className="text-sm">Type: {cell.type}</p>
                </div>
                <p className="text-sm text-destructive">
                  Cette action est irréversible et supprimera définitivement toutes les données associées.
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

            <TabsContent value="reserve" className="space-y-4 mt-4">
              <form onSubmit={handleReservation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="res-reservedBy">Réservée par *</Label>
                  <Input
                    id="res-reservedBy"
                    placeholder="Nom de la personne"
                    value={reservationData.reservedBy}
                    onChange={(e) => setReservationData({ ...reservationData, reservedBy: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="res-reservedFor">Réservée pour *</Label>
                  <Input
                    id="res-reservedFor"
                    placeholder="Objectif ou projet"
                    value={reservationData.reservedFor}
                    onChange={(e) => setReservationData({ ...reservationData, reservedFor: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="res-date">Date de réservation</Label>
                  <Input
                    id="res-date"
                    type="date"
                    value={reservationData.reservationDate}
                    onChange={(e) => setReservationData({ ...reservationData, reservationDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="res-comment">Commentaire</Label>
                  <Textarea
                    id="res-comment"
                    placeholder="Notes supplémentaires..."
                    value={reservationData.comment}
                    onChange={(e) => setReservationData({ ...reservationData, comment: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 justify-end">
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

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation finale</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de supprimer définitivement la cellule {cell.id}. 
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
