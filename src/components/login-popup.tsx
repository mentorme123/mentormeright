"use client";

import { useEffect, useState } from "react";
import { X, RefreshCw } from "lucide-react";

export function LoginPopup() {
  const [showClose, setShowClose] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const flag = sessionStorage.getItem("mentorme_show_login_popup");
    if (flag === "1" && window.location.pathname !== "/login") {
      sessionStorage.removeItem("mentorme_show_login_popup");
      setShowClose(true);
      setShowRefresh(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowClose(false);
  };

  const handleRefreshPopup = () => {
    setShowRefresh(false);
    window.location.reload();
  };

  return (
    <>
      {showClose && (
        <>
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClosePopup}
          />
          <div
            className="fixed top-1/2 left-1/2 z-[201] w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="bg-brand-blue p-6 text-white">
              <h3 className="font-black text-lg">Welcome back!</h3>
              <p className="text-brand-blue/50 text-sm mt-1">You have successfully logged in.</p>
            </div>
            <div className="p-6 text-center">
              <button
                onClick={handleClosePopup}
                className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {showRefresh && (
        <>
          <div
            className="fixed inset-0 z-[199] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
            onClick={handleRefreshPopup}
          />
          <div
            className="fixed top-1/2 left-1/2 z-[200] w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-brand-orange overflow-hidden flex flex-col"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="bg-brand-orange p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw size={20} strokeWidth={2.5} />
                <span className="font-black text-lg">Refresh Your Website</span>
              </div>
              <p className="text-orange-100 text-sm mt-1">
                Please refresh the page to apply your login session.
              </p>
            </div>
            <div className="p-6 text-center">
              <button
                onClick={handleRefreshPopup}
                className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} strokeWidth={2.5} />
                Refresh Now
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
