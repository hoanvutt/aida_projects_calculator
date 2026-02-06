"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const apiBase = useMemo(() => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  }, []);

  async function onCalculate() {
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${apiBase}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, op }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");

      setResult(data.result);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main style={{ maxWidth: 520, margin: "48px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Simple Calculator</h1>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <input value={a} onChange={(e) => setA(e.target.value)} style={{ flex: 1, padding: 10 }} />
        <select value={op} onChange={(e) => setOp(e.target.value)} style={{ padding: 10 }}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input value={b} onChange={(e) => setB(e.target.value)} style={{ flex: 1, padding: 10 }} />
      </div>

      <button onClick={onCalculate} style={{ padding: "10px 14px", cursor: "pointer" }}>
        Calculate
      </button>

      <div style={{ marginTop: 18 }}>
        <div style={{ opacity: 0.7, fontSize: 13 }}>API: {apiBase}</div>
        {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
        {result !== null && (
          <p style={{ fontSize: 20 }}>
            Result: <b>{result}</b>
          </p>
        )}
      </div>
    </main>
  );
}
