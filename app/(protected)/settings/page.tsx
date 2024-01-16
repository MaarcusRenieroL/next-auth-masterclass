"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const Settings = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  }
  return (
    <div className="p-10 rounded-xl border border-black">
      Settings Page
      <form>
        <button type="submit" onClick={onClick}>Sign Out</button>
      </form>
    </div>
  )
}

export default Settings;
