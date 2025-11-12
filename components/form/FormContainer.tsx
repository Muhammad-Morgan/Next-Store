"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { actionFunction } from "@/lib/utils/types";
const initialState = {
  message: "",
};
const FormContainer = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: actionFunction;
}) => {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message) toast({ description: state.message });
  }, [state]);
  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
