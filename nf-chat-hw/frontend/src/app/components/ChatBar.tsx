'use client'

import { useEffect, useState } from "react";
import useUserService from "../service/usersService";
import { User } from "../interfaces/user";
import Link from "next/link";
import OnlineStatus from "./OnlineStatus";


const ChatBar = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [username, setUsername] = useState<string | null>(null);
  const [nowId, setNowId] = useState<string | null>(null);
  const service = useUserService();

  useEffect(() => {
    const usernameFromStorage = localStorage.getItem("username");
    setUsername(usernameFromStorage);

    const fetchUsers = async () => {
      const usersData = await service.getAllUsers();
      setUsers(usersData);
    };

    fetchUsers();

    const storedId = localStorage.getItem('id');

    setNowId(storedId);
  }, [service]);

  return (
      <div className=" text-white p-4 fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center">
        <h2 className="text-xl text-black font-bold border-b border-gray-700 pb-2 mb-4">Hello, {username}</h2>
        <div className=" flex flex-col items-center">
          <h4 className=" text-black text-lg font-semibold mb-3 text-center">ACTIVE USERS</h4>
          <div className=" flex flex-col space-y-2 overflow-auto items-center w-full">
            {users ? (
                users.map(user => (
                    user._id !== nowId ? (
                        <div key={user._id} className="flex items-center justify-between w-11/12 bg-gray-700 p-2 rounded-md">
                          <Link href={`/chats/${user._id}`} className="text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out">{user.username}</Link>
                          <OnlineStatus userId={user._id} />
                        </div>
                    ) : null
                ))
            ) : (
                <div className="text-center text-gray-500">Loading...</div>
            )}
          </div>
        </div>
      </div>




  );
}

export default ChatBar;