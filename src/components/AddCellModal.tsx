import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddCellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddCellModal = ({ open, onOpenChange }: AddCellModalProps) => {
  const [formData, setFormData] = useState({
    identifier: "",
    cellName: "",
    cellType: "",
    cellCount: "1",
    sampleCount: "",
    keywords: "",
    freezeDate: "",
    expiryDate: "",
    owner: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.identifier) {
      toast.error("L'identifiant est requis");
      return;
    }
    
    toast.success("Cellule ajoutée avec succès!");
    onOpenChange(false);
    
    // Reset form
    setFormData({
      identifier: "",
      cellName: "",
      cellType: "",
      cellCount: "1",
      sampleCount: "",
      keywords: "",
      freezeDate: "",
      expiryDate: "",
      owner: "",
      comment: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une cellule</DialogTitle>
          <DialogDescription>
            Renseignez les informations de la nouvelle case.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier" className="text-sm font-medium">
              Identifiant <span className="text-destructive">*</span>
            </Label>
            <Input
              id="identifier"
              placeholder="ID_CASE_001"
              value={formData.identifier}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              maxLength={64}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.identifier.length}/64
            </p>
            {!formData.identifier && (
              <p className="text-xs text-destructive">Champ requis</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cellName">Cellule</Label>
            <Input
              id="cellName"
              placeholder="Nom de la cellule (ex: c'est le nom de cellule)"
              value={formData.cellName}
              onChange={(e) => setFormData({ ...formData, cellName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cellType">
              Type cellulaire <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.cellType}
              onValueChange={(value) => setFormData({ ...formData, cellType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un type cellulaire..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LB">LB</SelectItem>
                <SelectItem value="PBMC">PBMC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cellCount">Nombre de cellules (10⁶)</Label>
            <Input
              id="cellCount"
              type="number"
              value={formData.cellCount}
              onChange={(e) => setFormData({ ...formData, cellCount: e.target.value })}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sampleCount">Nombre d'échantillons / patient</Label>
            <Input
              id="sampleCount"
              type="number"
              placeholder="Saisir le nombre d'échantillons par patient"
              value={formData.sampleCount}
              onChange={(e) => setFormData({ ...formData, sampleCount: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Mots clés</Label>
            <Input
              id="keywords"
              placeholder="Séparés par des virgules: COVID-19, Oncologie, ..."
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Séparez les mots clés par des virgules.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="freezeDate">Date de congélation</Label>
            <Input
              id="freezeDate"
              type="date"
              value={formData.freezeDate}
              onChange={(e) => setFormData({ ...formData, freezeDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Date d'expiration</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Propriétaire</Label>
            <Input
              id="owner"
              placeholder="Sélectionner ou saisir..."
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire</Label>
            <Textarea
              id="comment"
              placeholder="Commentaire optionnel..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              maxLength={1000}
              rows={3}
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.comment.length}/1000
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
