"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloudIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const FormSchema = z.object({
  // name: z.string().min(4).max(24),
  avatar: z.instanceof(FileList),
});

export type UploadAvatarFormProps = {
  onSubmitForm: (values: z.infer<typeof FormSchema>) => void;
};

export default function UploadAvatarForm({
  onSubmitForm,
}: UploadAvatarFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    onSubmitForm(values);
  }

  const fileRef = form.register("avatar");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Avatar"
                  {...fileRef}
                  accept="image/jpeg"
                />
              </FormControl>
              <FormDescription className="text-xs pl-1">
                Imagem do novo avatar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          className="flex gap-1.5 mt-3.5 w-full"
        >
          Upload
          <UploadCloudIcon width={16} />
        </Button>
      </form>
    </Form>
  );
}
