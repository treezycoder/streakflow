import DashboardTemplate from "@/components/templates/dashboard";
import LogTemplate from "@/components/templates/log";
import SettingsTemplate from "@/components/templates/settings";
import StatsTemplate from "@/components/templates/stats";
import { Templates } from "@/types/templates";

export const navigationTemplates: Templates[] = [
  {
    option: "dashboard",
    component: <DashboardTemplate />,
  },
  {
    option: "settings",
    component: <SettingsTemplate />,
  },
  {
    option: "stats",
    component: <StatsTemplate />,
  },
  {
    option: "log",
    component: <LogTemplate />,
  },
];
