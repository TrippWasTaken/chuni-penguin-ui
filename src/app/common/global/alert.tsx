"use client";
import { useAlertState } from "@/app/context/alertContext";
import { Alert } from "@/types/alert";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";

export default function Alert() {
  const { alert } = useAlertState();
  const { type, show, message }: Alert = alert;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="alert"
          className={`alert absolute top-0 rounded-none alert-${type} `} // fix this as it doesnt actually work. Tailwind ignores dynamic
        >
          {
            {
              info: <InfoCircleOutlined />,
              success: <CheckCircleOutlined />,
              error: <ExclamationCircleOutlined />,
              warning: <WarningOutlined />,
            }[type]
          }

          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
