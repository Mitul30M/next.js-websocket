"use client"; // Ensures it only runs on the client side

import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the type for the context value
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void; // Added to handle manual disconnection
}

const SocketContext = createContext<SocketContextType | null>(null); // Update context type to match our needs

const STATEFUL_SERVER = process.env.STATEFULL_SERVER || "";

// Provide the context hook
export const useSocket = () => {
  console.log(STATEFUL_SERVER);
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useRef<Socket | null>(null);
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(false); // Track connection state
  const [isConnecting, setIsConnecting] = useState(false); // Track if we're in the process of connecting

  const userDB_id = (user?.publicMetadata as PublicMetadataType)?.userDB_id;

  // Only initialize the socket connection on button press
  const connectSocket = () => {
    if (!socket.current && userDB_id) {
      console.log(STATEFUL_SERVER);
      setIsConnecting(true); // Set connecting state to true
      socket.current = io(STATEFUL_SERVER, {
        withCredentials: true,
        query: { userId: userDB_id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to Socket Server");
        setIsConnected(true); // Mark as connected
        setIsConnecting(false); // Reset connecting state
      });

      socket.current.on("connect_error", (err) => {
        console.log("Connection Error: " + err.message);
        setIsConnecting(false); // Reset connecting state on error
      });

      socket.current.on("receive-message", async (data: MessageType) => {
        const userId = data.userDB_id ? "User " +data.userDB_id : "Random User";
        const message = JSON.stringify(data.message, null, 2);
        toast(userId, {
          description: message, // Simplify to ensure rendering works
        });
      });
    } else if (socket.current && !socket.current.connected) {
      // If socket exists but is disconnected, attempt to reconnect
      socket.current.connect();
      setIsConnecting(true); // Set connecting state to true
    }
  };

  // Manual disconnection
  const disconnectSocket = () => {
    if (socket.current && isConnected) {
      socket.current.disconnect();
      setIsConnected(false); // Mark as disconnected
      setIsConnecting(false); // Reset connecting state on disconnect
      console.log("Disconnected from Socket Server");
    }
  };

  useEffect(() => {
    return () => {
      // Clean up socket on component unmount
      if (socket.current) {
        socket.current.disconnect();
        setIsConnected(false); // Ensure clean-up happens on unmount
        console.log("Socket connection closed on unmount");
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
        connectSocket,
        disconnectSocket,
        isConnected,
        isConnecting,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
