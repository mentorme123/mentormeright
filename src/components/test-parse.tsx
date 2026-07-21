import React from 'react';
export function Test() {
  const [user, setUser] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  return (
    <div>
      {user ? (
        <div className="profile">
          {profileOpen && (
            <div className="dropdown">
              <p>Content</p>
            </div>
          )}
        </div>
      ) : (
        <div>Login</div>
      )}
    </div>
  );
}
