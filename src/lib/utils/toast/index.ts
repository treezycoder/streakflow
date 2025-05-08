import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "0.5rem",
  background: "#f97316", // Tailwind's orange-500 as hex
  color: "#fff",
  fontWeight: 500,
  padding: "12px 16px",
};

export function showSuccess(message: string) {
  toast.success(message, {
    duration: 3000,
    style: {
      ...baseStyle,
      background: "#ea580c", // Tailwind's orange-600
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#c2410c", // slightly darker icon circle
    },
  });
}

export function showError(message: string) {
  toast.error(message, {
    duration: 3000,
    style: {
      ...baseStyle,
      background: "#dc2626", // Tailwind's red-600
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#991b1b",
    },
  });
}
