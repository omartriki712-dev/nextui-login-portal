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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddBoxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddBoxModal = ({ open, onOpenChange }: AddBoxModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    rack: "",
    gridRows: "9",
    gridCols: "9",
    status: "active",
    description: "",
  });

  const racks = ["Rack 1", "Rack 2", "Rack 3", "Rack 4", "Rack 5", "Rack 6", "Rack 7", "Rack 8"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Le nom de la box est requis");
      return;
    }

    if (!formData.rack) {
      toast.error("Veuillez sélectionner un rack");
      return;
    }

    toast.success("Box créée avec succès!");
    onOpenChange(false);
    setFormData({
      name: "",
      rack: "",
      gridRows: "9",
      gridCols: "9",
      status: "active",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nouvelle Box</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la Box *</Label>
              <Input
                id="name"
                placeholder="Ex: Box 1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rack">Rack *</Label>
              <Select
                value={formData.rack}
                onValueChange={(value) => setFormData({ ...formData, rack: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rack" />
                </SelectTrigger>
                <SelectContent>
                  {racks.map((rack) => (
                    <SelectItem key={rack} value={rack}>
                      {rack}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gridRows">Lignes de la grille</Label>
              <Select
                value={formData.gridRows}
                onValueChange={(value) => setFormData({ ...formData, gridRows: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} lignes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gridCols">Colonnes de la grille</Label>
              <Select
                value={formData.gridCols}
                onValueChange={(value) => setFormData({ ...formData, gridCols: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} colonnes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="empty">Vide</SelectItem>
                <SelectItem value="full">Pleine</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description de la box..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.description.length}/200
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="success">Créer la Box</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
