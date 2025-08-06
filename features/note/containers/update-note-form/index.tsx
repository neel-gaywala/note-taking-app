"use client";

import React, { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { useUpdateNote } from "@/features/note/api";

type UpdateNoteProps = {
  id: number;
  onSuccess?: () => void;
  onError?: () => void;
} & CreateNoteSchemaType;

export default function UpdateNoteForm(props: UpdateNoteProps) {
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
    const updatedParams = {
      ...params,
      id: props.id,
    };

    updateNoteApi(updatedParams, {
      onSuccess: (response: unknown) => {
        console.log(response);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
