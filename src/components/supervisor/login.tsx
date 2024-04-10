import { FC, useEffect, useState } from "react";
import { DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";

const CIRCLE_NUMS = 4;

type Key = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "x";

interface LoginProps {
  isWaiting: boolean;
  onAuthorise: () => void;
  onLoginFail: () => void;
}

export const Login: FC<LoginProps> = ({
  isWaiting,
  onAuthorise,
  onLoginFail,
}) => {
  const [pincode, setPincode] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    if (pincode.length === 4) {
      checkAuthorization();
    }
  }, [pincode]);

  useEffect(() => {
    if (!isWaiting) {
      setPincode("");
      setAttempts(0);
    }
  }, [isWaiting]);

  const checkAuthorization = async () => {
    setAttempts((previousAttempts) => previousAttempts + 1);
    try {
      setIsChecking(true);
      const response = await fetch("http://localhost:8080/validate-pincode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pincode }),
      });

      const { status } = await response.json();

      if (status === "Authorized") {
        setAttempts(0);
        onAuthorise();
      }
      if (status === "Failed") {
        if (attempts < 3) {
          setPincode("");
        } else {
          onLoginFail();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsChecking(false);
    }
  };

  const keys: Key[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "x"];

  const clickHandler = (key: Key) => {
    if (key === "x") {
      const newPincode = pincode.slice(0, -1);
      setPincode(newPincode);
    } else {
      if (pincode.length < 4) {
        const newPincode = pincode + key;
        setPincode(newPincode);
      }
    }
  };

  return (
    <div className="pincode">
      <h3 className="login-header">Log in om verder te gaan</h3>
      {isChecking ? (
        <div>Checking pincode validity...</div>
      ) : (
        <>
          <div className="circles">
            {Array(CIRCLE_NUMS)
              .fill("")
              .map((_, index) => (
                <span
                  key={index}
                  data-testid="circle-element"
                  className={
                    index < pincode.length ? "filled-circle" : "empty-circle"
                  }
                />
              ))}
          </div>
          <div className="keys">
            {keys.map((key, index) => (
              <button
                key={index}
                data-testid="key-element"
                className={
                  (key === "0" ? "zero-key" : key === "x" ? "delete-key" : "") +
                  " key"
                }
                onClick={() => clickHandler(key)}
              >
                {key === "x" ? <DeleteIcon className="delete-icon" /> : key}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
