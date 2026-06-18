import * as React from "react";

export function Toaster() {
  return null;
}

export function useToast() {
  const [toasts, setToasts] = React.useState<any[]>([]);
  const toast = React.useCallback(({ title, description, variant }: { title?: string; description?: string; variant?: string }) => {
    console.log("Toast:", title, description, variant);
  }, []);
  return { toast, toasts };
}
