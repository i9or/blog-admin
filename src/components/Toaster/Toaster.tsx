import { useToaster } from "~/contexts/ToasterContext";
import { Toast } from "./Toast";

export const Toaster = () => {
  const { toasts } = useToaster();

  return (
    <section className="fixed bottom-0 right-0 flex flex-col-reverse p-4">
      {toasts.map((toast) => (
        <Toast
          id={toast.id}
          text={`${toast.text}_${toast.id}`}
          status={toast.status}
          key={toast.id}
        />
      ))}
    </section>
  );
};
