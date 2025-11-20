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
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
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
      <Modal isOpen={open} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirmation finale</ModalHeader>
              <ModalBody>
                <p>
                  Vous êtes sur le point de supprimer définitivement la cellule {cell.id}. Cette
                  action ne peut pas être annulée.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={() => setShowDeleteConfirm(false)}>
                  Annuler
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Supprimer définitivement
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Actions sur la cellule {cell.id}</ModalHeader>
            <ModalBody>
              <Tabs aria-label="Action options" variant="underlined">
                <Tab key="modify" title="Modifier">
                  <form onSubmit={handleModify} className="flex flex-col gap-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Identifiant"
                        value={modifyData.identifier}
                        onChange={(e) =>
                          setModifyData({ ...modifyData, identifier: e.target.value })
                        }
                        isRequired
                        variant="bordered"
                      />
                      <Input
                        label="Nom de la cellule"
                        value={modifyData.cellName}
                        onChange={(e) =>
                          setModifyData({ ...modifyData, cellName: e.target.value })
                        }
                        variant="bordered"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Type cellulaire"
                        selectedKeys={modifyData.cellType ? [modifyData.cellType] : []}
                        onChange={(e) =>
                          setModifyData({ ...modifyData, cellType: e.target.value })
                        }
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
                        value={modifyData.cellCount}
                        onChange={(e) =>
                          setModifyData({ ...modifyData, cellCount: e.target.value })
                        }
                        variant="bordered"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Date de congélation"
                        type="date"
                        value={modifyData.freezeDate}
                        onChange={(e) =>
                          setModifyData({ ...modifyData, freezeDate: e.target.value })
                        }
                        variant="bordered"
                      />
                      <Input
                        label="Date d'expiration"
                        type="date"
                        value={modifyData.expiryDate}
                        onChange={(e) =>
                          setModifyData({ ...modifyData, expiryDate: e.target.value })
                        }
                        variant="bordered"
                      />
                    </div>

                    <Textarea
                      label="Commentaire"
                      value={modifyData.comment}
                      onChange={(e) => setModifyData({ ...modifyData, comment: e.target.value })}
                      variant="bordered"
                    />

                    <div className="flex gap-3 justify-end pt-2">
                      <Button variant="flat" onPress={onClose}>
                        Annuler
                      </Button>
                      <Button color="primary" type="submit">
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                </Tab>

                <Tab key="delete" title="Supprimer">
                  <div className="flex flex-col gap-4 py-4 text-center">
                    <p className="text-lg">Êtes-vous sûr de vouloir supprimer cette cellule ?</p>
                    <Card>
                      <CardBody>
                        <p className="font-mono text-sm mb-2">Identifiant: {cell.id}</p>
                        <p className="text-sm">Position: {cell.position}</p>
                        <p className="text-sm">Type: {cell.type}</p>
                      </CardBody>
                    </Card>
                    <p className="text-sm text-danger">
                      Cette action est irréversible et supprimera définitivement toutes les données
                      associées.
                    </p>
                    <div className="flex gap-3 justify-center pt-4">
                      <Button variant="flat" onPress={onClose}>
                        Annuler
                      </Button>
                      <Button color="danger" onPress={() => setShowDeleteConfirm(true)}>
                        Confirmer la suppression
                      </Button>
                    </div>
                  </div>
                </Tab>

                <Tab key="reserve" title="Réserver">
                  <form onSubmit={handleReservation} className="flex flex-col gap-4 pt-4">
                    <Input
                      label="Réservée par"
                      placeholder="Nom de la personne"
                      value={reservationData.reservedBy}
                      onChange={(e) =>
                        setReservationData({ ...reservationData, reservedBy: e.target.value })
                      }
                      isRequired
                      variant="bordered"
                    />

                    <Input
                      label="Réservée pour"
                      placeholder="Objectif ou projet"
                      value={reservationData.reservedFor}
                      onChange={(e) =>
                        setReservationData({ ...reservationData, reservedFor: e.target.value })
                      }
                      isRequired
                      variant="bordered"
                    />

                    <Input
                      label="Date de réservation"
                      type="date"
                      value={reservationData.reservationDate}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          reservationDate: e.target.value,
                        })
                      }
                      variant="bordered"
                    />

                    <Textarea
                      label="Commentaire"
                      placeholder="Notes supplémentaires..."
                      value={reservationData.comment}
                      onChange={(e) =>
                        setReservationData({ ...reservationData, comment: e.target.value })
                      }
                      variant="bordered"
                    />

                    <div className="flex gap-3 justify-end pt-2">
                      <Button variant="flat" onPress={onClose}>
                        Annuler
                      </Button>
                      <Button color="primary" type="submit">
                        Créer la réservation
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
