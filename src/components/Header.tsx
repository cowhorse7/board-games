import { useState } from "react";
import "./Header.css";

type HeaderProps = {
  profileName: string;
  profileDraft: string;
  onProfileDraftChange: (value: string) => void;
  onCreateProfile: () => void;
  onSignOut: () => void;
};

export default function Header({
  profileName,
  profileDraft,
  onProfileDraftChange,
  onCreateProfile,
  onSignOut,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="main-header">
      <h1>Board Games</h1>
      <div className="profile-section">
        {profileName ? (
          <>
            <span className="profile-name">
              {profileName}{" "}
              <button
                className="dropdown-button"
                onClick={() => setOpen((o) => !o)}
              >
                ▾
              </button>
            </span>
            {open && (
              <div className="profile-dropdown">
                <button className="menu-item">Settings</button>
                <button className="menu-item" onClick={onSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="profile-form">
            <input
              value={profileDraft}
              onChange={(e) => onProfileDraftChange(e.target.value)}
              placeholder="Create profile"
            />
            <button onClick={onCreateProfile}>Create</button>
          </div>
        )}
      </div>
    </header>
  );
}
