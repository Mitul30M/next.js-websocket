"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioTower } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useSocket } from "@/context/SocketContext";

const FormSchema = z.object({
  message: z
    .string()
    .min(1, {
      message: "Cannot Broadcast Empty Messages",
    })
    .max(150, {
      message: "Message must not be longer than 150 characters.",
    }),
});

export function BroadcastMessageInput() {
  const { user } = useUser();
  const { socket } = useSocket()!;
  const userDB_id = (user?.publicMetadata as PublicMetadataType)?.userDB_id;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit", // Ensure validation happens on submit
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const message = data.message;
    socket?.emit("send-message", {
      userDB_id,
      message,
    });
  }

  return (
    <Card className="w-max p-4 text-wrap shadow-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[400px] space-y-4 flex flex-col"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="text-left space-y-4">
                <FormLabel>Your Message</FormLabel>
                <FormDescription>
                  Your <span>broadcasted</span> message is visible to other
                  users who currently have also established a WebSockets
                  Connection.
                </FormDescription>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="max-w-[400px]"
                    placeholder="Scream out to the world..."
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* This should show validation errors */}
              </FormItem>
            )}
          />
          <Button type="submit" className=" self-end">
            <RadioTower />
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
