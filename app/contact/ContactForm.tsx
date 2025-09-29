"use client";
import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormState = {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

const FormSchema = z.object({
  email: z.string().email("Enter a valid email."),
  topic: z.string().min(1, "Select a topic."),
  message: z.string().min(5, "Message is too short."),
});

export default function ContactForm({
  action,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, {} as FormState);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      topic: "order",
      message: "",
    },
  });

  useEffect(() => {
    if (state?.ok && formRef.current) {
      formRef.current.reset();
      form.reset();
    }
  }, [state?.ok, form]);

  const handleFormSubmit = (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('topic', data.topic);
    formData.append('message', data.message);
    formAction(formData);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          {/* Email + Topic Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-sm font-medium tracking-wide">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-sm font-medium tracking-wide">
                    Topic
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="order">Order / Shipping</SelectItem>
                      <SelectItem value="returns">Returns & Refunds</SelectItem>
                      <SelectItem value="product">Product Question</SelectItem>
                      <SelectItem value="collab">Collaboration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel className="text-sm font-medium tracking-wide">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what's up..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      disabled={pending}
      size="lg"
      className="w-full"
    >
      {pending ? "Sending…" : "Send Message"}
    </Button>
  );
}
