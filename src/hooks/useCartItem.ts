import { useTransition } from "react";
import { toast } from "sonner";

// hooks/useCartItem.ts
export function useCartItem() {
  const [isRemoving, startRemove] = useTransition();
  const [isIncrementing, startIncrement] = useTransition();
  const [isDecrementing, startDecrement] = useTransition();

  const isDisabled = isRemoving || isIncrementing || isDecrementing;

  const handle = (
    action: () => Promise<{ success: boolean; message: string }>,
    start: typeof startRemove,
  ) => {
    start(async () => {
      const result = await action();
      result.success
        ? toast.success(result.message)
        : toast.error(result.message);
    });
  };

  return {
    isDisabled,
    isRemoving,
    isIncrementing,
    isDecrementing,
    onRemove: (action: () => Promise<{ success: boolean; message: string }>) =>
      handle(action, startRemove),
    onIncrement: (
      action: () => Promise<{ success: boolean; message: string }>,
    ) => handle(action, startIncrement),
    onDecrement: (
      action: () => Promise<{ success: boolean; message: string }>,
    ) => handle(action, startDecrement),
  };
}
