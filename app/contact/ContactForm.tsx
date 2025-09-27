"use client";
import { useEffect, useRef, useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import Button from "@/app/components/ui/buttons/Button";
import Dropdown from "@/app/components/ui/inputs/Dropdown";
import { TextInput, TextArea } from "@/app/components/ui/inputs/TextFields";

type FormState = {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export default function ContactForm({
  action,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, {} as FormState);
  const formRef = useRef<HTMLFormElement>(null);
  const [topic, setTopic] = useState("order");

  useEffect(() => {
    if (state?.ok && formRef.current) {
      formRef.current.reset();
      setTopic("order");
    }
  }, [state?.ok]);

  return (
    <div className="w-full max-w-none">
      <form
        ref={formRef}
        action={formAction}
        className="block w-full max-w-none flex flex-col gap-6"
      >
        {/* Row: Email + Topic */}
        <div className="w-full max-w-none grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="w-full max-w-none flex flex-col justify-center">
            <label htmlFor="email" className="block text-sm mb-2 tracking-wide">
              Email
            </label>
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex w-full max-w-none border border-foreground px-3 py-2 h-10 items-center focus:outline-none focus:ring-0"
            />
            {state?.fieldErrors?.email && (
              <p className="text-error text-xs mt-1">{state.fieldErrors.email}</p>
            )}
          </div>

          <div className="w-full max-w-none flex flex-col justify-center">
            <label htmlFor="topic" className="block text-sm mb-2 tracking-wide">
              Topic
            </label>
            <Dropdown
              options={[
                { value: "order", label: "Order / Shipping" },
                { value: "returns", label: "Returns & Refunds"},
                { value: "product", label: "Product Question"},
                { value: "collab", label: "Collaboration"},
                { value: "other", label: "Other"},
              ]}
              value={topic}
              onChange={setTopic}
              variant="primary"
              align="left"
              inputClassName="flex w-full max-w-none border border-foreground px-3 py-2 h-10 items-center focus:outline-none focus:ring-0"
              labelClassName="text-sm w-full"
              arrowSize={25}
              itemClassName="px-3 py-2 w-full text-sm"
              menuClassName="w-full min-w-0"
            />
            {state?.fieldErrors?.topic && (
              <p className="text-error text-xs mt-1">{state.fieldErrors.topic}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="w-full max-w-none">
          <label htmlFor="message" className="block text-sm mb-2 tracking-wide">
            Message
          </label>
          <TextArea
            id="message"
            name="message"
            required
            placeholder="Tell us what's up..."
            className="h-32 resize-y"
          />
          {state?.fieldErrors?.message && (
            <p className="text-error text-xs mt-1">{state.fieldErrors.message}</p>
          )}
        </div>

        <SubmitButton />

        {state?.ok && <p className="text-success text-sm">Thanks — we got your message.</p>}
        {state?.message && !state.ok && <p className="text-error text-sm">{state.message}</p>}
      </form>
    </div>
  );
}

function SubmitButton() {
  
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="primary" fullWidth disabled={pending}>
      {pending ? "Sending…" : "Send"}
    </Button>
  );
}
