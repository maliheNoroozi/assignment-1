import { FC, useEffect, useState } from "react";
import { X as CloseIcon } from "lucide-react";
import { StopProcedureModal } from "./stop-procedure-modal";
import { Login } from "./login";

interface ModalProps {
  closeSupervisorModal: () => void;
}

export const SupervisorModal: FC<ModalProps> = ({ closeSupervisorModal }) => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [stopProcedureModalOpen, setStopProcedureModalOpen] =
    useState<boolean>(false);

  const closeStopProcedureModal = () => {
    setStopProcedureModalOpen((previousState) => !previousState);
    closeSupervisorModal();
  };

  const onAuthorise = () => setStopProcedureModalOpen(true);
  const onLoginFail = () => setIsWaiting(true);

  useEffect(() => {
    if (isWaiting) {
      const timer = setTimeout(() => {
        setIsWaiting(false);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [isWaiting]);

  return (
    <>
      <div className="overlay" />
      <CloseIcon className="close-icon" onClick={closeSupervisorModal} />
      <div className="center">
        {isWaiting ? (
          <h2 className="shake">Wait for 30 seconds to try again</h2>
        ) : stopProcedureModalOpen ? (
          <StopProcedureModal
            closeStopProcedureModal={closeStopProcedureModal}
          />
        ) : (
          <Login
            isWaiting={isWaiting}
            onAuthorise={onAuthorise}
            onLoginFail={onLoginFail}
          />
        )}
      </div>
    </>
  );
};
