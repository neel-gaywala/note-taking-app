"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ButtonLoading } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateNote } from "@/features/note/api";
import { useInvalidateQueries } from "@/hooks";
import { CreateNoteSchemaType } from "@/lib/types";
import { createNoteSchema } from "@/lib/validations";

type UpdateNoteProps = {
  id: number;
  onSuccess?: () => void;
  onError?: () => void;
} & CreateNoteSchemaType;

export default function UpdateNoteForm(props: UpdateNoteProps) {
  const { invalidateQueries } = useInvalidateQueries();

  const form = useForm<CreateNoteSchemaType>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const { title, content, id } = props;
    if (id) {
      form.reset({
        title,
        content,
      });
    }
  }, [props, form]);

  const { mutate: updateNoteApi, isPending } = useUpdateNote();

  const onSubmit: SubmitHandler<CreateNoteSchemaType> = (params) => {
    const { id, onSuccess, onError } = props;
    const updatedParams = {
      ...params,
      id,
    };

    updateNoteApi(updatedParams, {
      onSuccess: () => {
        onSuccess?.();
        invalidateQueries(["notes"]);
        toast.success("Note Updated successfully");
      },
      onError: () => {
        onError?.();
        toast.error("Failed to update note");
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
                <FormLabel>{"Title"}</FormLabel>
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
                <FormLabel>{"Content"}</FormLabel>
                <FormControl>
                  <Textarea className=" max-h-60" {...field} />
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
            {"Update"}
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
}
