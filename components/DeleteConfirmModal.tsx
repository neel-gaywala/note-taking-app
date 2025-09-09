import { AlertTriangle } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Note"
      className="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-700">
              {
                "Are you sure you want to delete this note? This action cannot be undone."
              }
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {"Cancel"}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {"Delete Note"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
