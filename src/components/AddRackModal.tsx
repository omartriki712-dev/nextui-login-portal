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

interface AddRackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddRackModal = ({ open, onOpenChange }: AddRackModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    tank: "",
    capacity: "",
    status: "active",
    description: "",
  });

  const tanks = ["Tank 1", "Tank 2", "Tank 3", "Tank 4", "Tank 5", "Tank 6"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Le nom du rack est requis");
      return;
    }

    if (!formData.tank) {
      toast.error("Veuillez sélectionner un tank");
      return;
    }

    toast.success("Rack créé avec succès!");
    onOpenChange(false);
    setFormData({
      name: "",
      tank: "",
      capacity: "",
      status: "active",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Nouveau Rack</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du Rack *</Label>
              <Input
                id="name"
                placeholder="Ex: Rack 1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tank">Tank *</Label>
              <Select
                value={formData.tank}
                onValueChange={(value) => setFormData({ ...formData, tank: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un tank" />
                </SelectTrigger>
                <SelectContent>
                  {tanks.map((tank) => (
                    <SelectItem key={tank} value={tank}>
                      {tank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité (boxes)</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Ex: 27"
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
              placeholder="Description du rack..."
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
            <Button type="submit" variant="secondary">Créer le Rack</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
