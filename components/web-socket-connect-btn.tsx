"use client";
import { useSocket } from "@/context/SocketContext";
import { Loader, Unplug } from "lucide-react";
import { Button } from "./ui/button";
import { BroadcastMessageInput } from "./broadcast-msg-input";
import { Badge } from "@/components/ui/badge";

const WebSocketConnect = () => {
  const { connectSocket, disconnectSocket, isConnected, isConnecting } =
    useSocket()!;
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full">
      {!isConnected && !isConnecting && (
        <>
          <Button variant="outline" onClick={connectSocket} className="w-max">
            <Unplug />
            Establish WebSocket
          </Button>
          <Badge variant="secondary">
            Connect Backend Stateful Server
            {process.env.NEXT_PUBLIC_STATEFULL_SERVER}
          </Badge>
        </>
      )}

      {isConnecting && (
        <Button variant="outline" disabled>
          <Loader className="size-4 animate-spin" />
          Connecting...
        </Button>
      )}

      {isConnected && <BroadcastMessageInput />}

      {isConnected && (
        <div className="flex flex-row gap-4 justify-center items-center">
          <p className="flex flex-row gap-2 items-center justify-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-slate-50 bg-zinc-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 dark:bg-slate-100 bg-zinc-800"></span>
            </span>
            Connected
          </p>

          <Button
            variant="outline"
            onClick={disconnectSocket}
            className=" text-red-600"
          >
            <Unplug />
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};

export default WebSocketConnect;
