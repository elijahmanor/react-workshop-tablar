import React from "react";
import greetingTime from "greeting-time";

function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export function Greeting({
  dateTime,
  name,
  isEditing,
  onChange,
  onExit,
  onDoubleClick
}) {
  const greeting = `${greetingTime(dateTime)}, ${name}`;
  return (
    <div className="Greeting" onDoubleClick={onDoubleClick}>
      {!isEditing ? (
        <h1>{greeting}</h1>
      ) : (
        <input
          type="text"
          value={name}
          autoFocus={!isInIframe()}
          placeholder="What's your name?"
          onChange={e => onChange(e.target.value)}
          onKeyPress={e => e.key === "Enter" && onExit()}
          onBlur={onExit}
        />
      )}
    </div>
  );
}
