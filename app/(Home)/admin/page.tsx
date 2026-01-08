"use client";

import { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import {
  GET_ALL_USERS,
  UPDATE_USER_BALANCE,
  ME,
} from "@/app/(Home)/admin/queries";
import { useMutation, useQuery } from "@apollo/client/react";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

interface GetAllUsersResponse {
  getAllUsers: User[];
}

interface MeResponse {
  me: User;
}

export default function AdminDashboard() {
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery<MeResponse>(ME);
  const { data, loading, error, refetch } =
    useQuery<GetAllUsersResponse>(GET_ALL_USERS);
  const [updateUserBalance] = useMutation(UPDATE_USER_BALANCE);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newBalance, setNewBalance] = useState<number>(0);

  const currentUser = meData?.me;

  const handleUpdateBalance = async () => {
    if (!selectedUserId || newBalance < 0) {
      alert("Please select a user and enter a valid balance");
      return;
    }

    try {
      await updateUserBalance({
        variables: { userId: selectedUserId, amount: newBalance },
      });
      alert("Balance updated successfully");
      refetch();
      setSelectedUserId(null);
      setNewBalance(0);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (meLoading || loading) return <div className="p-8">Loading...</div>;

  if (meError || !currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Access Denied
            </h2>
            <p className="text-slate-300 mb-4">
              You don't have permission to access the admin dashboard. Only
              administrators can access this area.
            </p>
            <a
              href="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Error Loading Dashboard
            </h2>
            <p className="text-slate-300 mb-4">
              An error occurred while loading the dashboard. Please try again.
            </p>
            <a
              href="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminPanel
      users={data?.getAllUsers || []}
      selectedUserId={selectedUserId}
      newBalance={newBalance}
      onSelectUser={setSelectedUserId}
      onBalanceChange={setNewBalance}
      onUpdateBalance={handleUpdateBalance}
    />
  );
}
