import { useEffect, useState } from "react";
import { fetchStatus } from "../../api/gptService";

export default function DashboardPage() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchStatus().then((data) => setStatus(data.status));
  }, []);

  return <div>Server status: {status}</div>;
}
