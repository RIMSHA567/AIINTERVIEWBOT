import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";

function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const session_id = params.get("session_id");

      if (!session_id) return;

      await axios.post(
        ServerUrl + "/api/payment/verify",
        { session_id },
        { withCredentials: true },
      );

      alert("Payment Successful ✅");
      navigate("/");
    };

    verify();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-xl font-semibold">Processing Payment...</h1>
    </div>
  );
}

export default PaymentSuccess;
