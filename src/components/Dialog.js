import React from "react";
import { Dialog as ReachDialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

export function Dialog({ isOpen, onClose, children }) {
  return (
    <ReachDialog isOpen={isOpen}>
      {children}
      <button className="Tablar-closeDialog" title="Close" onClick={onClose}>
        <svg
          viewBox="0 0 40 40"
          stroke="black"
          fill="transparent"
          strokeLinecap="round"
          strokeWidth="5"
        >
          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
    </ReachDialog>
  );
}
