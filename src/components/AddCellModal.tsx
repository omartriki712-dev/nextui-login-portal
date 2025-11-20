import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
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
    <Modal isOpen={open} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl">Ajouter une cellule</h2>
              <p className="text-sm text-default-500 font-normal">
                Renseignez les informations de la nouvelle case.
              </p>
            </ModalHeader>
            <ModalBody>
              <Input
                label="Identifiant"
                placeholder="ID_CASE_001"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                isRequired
                maxLength={64}
                description={`${formData.identifier.length}/64`}
                variant="bordered"
                errorMessage={!formData.identifier && "Champ requis"}
              />

              <Input
                label="Cellule"
                placeholder="Nom de la cellule (ex: c'est le nom de cellule)"
                value={formData.cellName}
                onChange={(e) => setFormData({ ...formData, cellName: e.target.value })}
                variant="bordered"
              />

              <Select
                label="Type cellulaire"
                placeholder="Choisir un type cellulaire..."
                selectedKeys={formData.cellType ? [formData.cellType] : []}
                onChange={(e) => setFormData({ ...formData, cellType: e.target.value })}
                isRequired
                variant="bordered"
              >
                <SelectItem key="LB" value="LB">
                  LB
                </SelectItem>
                <SelectItem key="PBMC" value="PBMC">
                  PBMC
                </SelectItem>
              </Select>

              <Input
                label="Nombre de cellules (10⁶)"
                type="number"
                value={formData.cellCount}
                onChange={(e) => setFormData({ ...formData, cellCount: e.target.value })}
                min="1"
                variant="bordered"
              />

              <Input
                label="Nombre d'échantillons / patient"
                type="number"
                placeholder="Saisir le nombre d'échantillons par patient"
                value={formData.sampleCount}
                onChange={(e) => setFormData({ ...formData, sampleCount: e.target.value })}
                variant="bordered"
              />

              <Input
                label="Mots clés"
                placeholder="Séparés par des virgules: COVID-19, Oncologie, ..."
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                description="Séparez les mots clés par des virgules."
                variant="bordered"
              />

              <Input
                label="Date de congélation"
                type="date"
                value={formData.freezeDate}
                onChange={(e) => setFormData({ ...formData, freezeDate: e.target.value })}
                variant="bordered"
              />

              <Input
                label="Date d'expiration"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                variant="bordered"
              />

              <Input
                label="Propriétaire"
                placeholder="Sélectionner ou saisir..."
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                variant="bordered"
              />

              <Textarea
                label="Commentaire"
                placeholder="Commentaire optionnel..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                maxLength={1000}
                description={`${formData.comment.length}/1000`}
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Annuler
              </Button>
              <Button color="primary" type="submit">
                Enregistrer
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
