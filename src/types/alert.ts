export interface Alert {
  duration: number;
  show: boolean;
  type: "info" | "success" | "warning" | "error";
  message: "string" | null;
}

// export interface AlertProps {
//   duration: number;
// }
