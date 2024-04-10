import { FC } from "react";
import { X as CloseIcon } from "lucide-react";

interface StopProcedureModalProps {
  closeStopProcedureModal: () => void;
}

export const StopProcedureModal: FC<StopProcedureModalProps> = ({
  closeStopProcedureModal,
}) => {
  return (
    <div className="stop-procedure-modal">
      <CloseIcon className="close-icon" onClick={closeStopProcedureModal} />
      <h3 className="header">Weet u zeker dat u de procedure wilt stoppen?</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a laoreet
        erat. Nulla gravida dui ex, quis convallis est semper et. Morbi a
        laoreet erat. Nulla gravida dui ex, quis convallis est semper et.
      </p>
      <div className="actions">
        <button
          className="button primary-button"
          onClick={closeStopProcedureModal}
        >
          Stop procedure
        </button>
        <button
          className="button secondary-button"
          onClick={closeStopProcedureModal}
        >
          Annuleren
        </button>
      </div>
    </div>
  );
};
