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

interface AddTankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddTankModal = ({ open, onOpenChange }: AddTankModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    status: "active",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Le nom du tank est requis");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("L'emplacement est requis");
      return;
    }

    toast.success("Tank créé avec succès!");
    onOpenChange(false);
    setFormData({
      name: "",
      location: "",
      capacity: "",
      status: "active",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nouveau Tank</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du Tank *</Label>
              <Input
                id="name"
                placeholder="Ex: Tank 1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement *</Label>
              <Input
                id="location"
                placeholder="Ex: Zone A"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                maxLength={50}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité (racks)</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Ex: 12"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                min={0}
                max={100}
              />
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
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="empty">Vide</SelectItem>
                  <SelectItem value="full">Plein</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description du tank..."
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
            <Button type="submit">Créer le Tank</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
