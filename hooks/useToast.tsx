"use client";

import { toast } from "sonner";

export function useToast() {
  return {
    toast: (props: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive" | "success" | "warning" | "info";
      action?: {
        label: string;
        onClick: () => void;
      };
      duration?: number;
    }) => {
      const {
        title,
        description,
        variant = "default",
        action,
        duration,
      } = props;

      const content =
        title && description ? (
          <div className="grid gap-1">
            <div className="font-semibold">{title}</div>
            <div className="text-sm opacity-90">{description}</div>
          </div>
        ) : (
          title || description
        );

      const options = {
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      };

      switch (variant) {
        case "destructive":
          return toast.error(content, options);
        case "success":
          return toast.success(content, options);
        case "warning":
          return toast.warning(content, options);
        case "info":
          return toast.info(content, options);
        default:
          return toast(content, options);
      }
    },
    dismiss: (toastId?: string | number) => {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    },
  };
}

export { toast };
