"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNoteSchema } from "@/lib/validations";
import { CreateNoteSchemaType } from "@/lib/types";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonLoading } from "@/components/ui/button";
import { useCreateNote } from "@/features/note/api";
import { useInvalidateQueries } from "@/hooks";

const DEFAULT_VALUES = {
  title: "",
  content: "",
};

type CreateNoteFormProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export default function CreateNoteForm({
  onSuccess,
  onError,
}: CreateNoteFormProps) {
  const form = useForm<CreateNoteSchemaType>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: createNoteApi, isPending } = useCreateNote();

  const onSubmit: SubmitHandler<CreateNoteSchemaType> = (noteParams) => {
    createNoteApi(noteParams, {
      onSuccess: () => {
        invalidateQueries(["notes"]);
        onSuccess?.();
      },
      onError: () => {
        onError?.();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="space-y-4">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-4">
          <ButtonLoading
            loading={isPending}
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            className="cursor-pointer"
          >
            Create
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
}
