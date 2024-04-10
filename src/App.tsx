import { useEffect, useState } from "react";
import { SupervisorModal } from "./components/supervisor/supervisor-modal";
import { socket } from "./socket";
import toast from "react-hot-toast";
import { Toaster, resolveValue } from "react-hot-toast";
import "./App.css";

function App() {
  const [supervisorModalOpen, setSupervisorModalOpen] =
    useState<boolean>(false);

  const openSupervisorModal = () => setSupervisorModalOpen(true);
  const closeSupervisorModal = () => setSupervisorModalOpen(false);

  useEffect(() => {
    function onConnect() {
      console.log("Connected to socket");
    }

    function onDisconnect() {
      console.log("Disconnected from socket");
    }

    function onMotorFailure(message: string) {
      toast.error(message);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("motorFailure", onMotorFailure);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("motorFailure", onMotorFailure);
    };
  }, []);

  return (
    <main>
      <Toaster position="top-center">
        {(t) => <div className="error-toast">{resolveValue(t.message, t)}</div>}
      </Toaster>
      <div className="container">
        <button className="abort-button" onClick={openSupervisorModal}>
          Abort procedure
        </button>
      </div>
      {supervisorModalOpen && (
        <SupervisorModal closeSupervisorModal={closeSupervisorModal} />
      )}
    </main>
  );
}

export default App;
