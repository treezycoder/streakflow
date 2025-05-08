/* eslint-disable @typescript-eslint/no-explicit-any */

export const syncStateToLocalStorage = (state: {
  habits: any;
  progress: any;
  notifications: any;
  settings: any;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("streakFlowHabits", JSON.stringify(state.habits));
    localStorage.setItem("streakFlowProgress", JSON.stringify(state.progress));
    localStorage.setItem(
      "streakFlowNotifications",
      JSON.stringify(state.notifications)
    );
    localStorage.setItem("streakFlowSettings", JSON.stringify(state.settings));
  }
};
