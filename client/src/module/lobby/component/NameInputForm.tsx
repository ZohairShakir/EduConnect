import React from "react"

interface NameInputFormProps {
  name: string
  handleNameChange: (event: any) => void
  nameValidationError: string
}

// This component is no longer used directly — name input is inline in Lobby.tsx
// Kept for backwards-compatibility in case other parts of the app import it.
export const NameInputForm: React.FC<NameInputFormProps> = ({
  name,
  handleNameChange,
  nameValidationError,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        style={{ borderColor: nameValidationError ? "#e05252" : undefined }}
      />
      {nameValidationError && (
        <span style={{ fontSize: 12, color: "#e05252" }}>{nameValidationError}</span>
      )}
    </div>
  )
}
