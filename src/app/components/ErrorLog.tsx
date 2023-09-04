"use client"
import { forwardRef, useImperativeHandle, useState } from "react"

export const ErrorLog = forwardRef<{setError: (log: string) => void}>((props, ref) => {
  const [errorLog, setErrorLog] = useState<string>('');

  useImperativeHandle(ref, () => ({
    setError(log: string) {
      setErrorLog(log);
    }
  }))

  return errorLog ? (
    <div
      className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>{errorLog}</p>
    </div>
  ) : (
    <div></div>
  );
});