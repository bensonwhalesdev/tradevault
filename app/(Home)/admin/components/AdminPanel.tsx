import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

interface AdminPanelProps {
  users: User[];
  selectedUserId: string | null;
  newBalance: number;
  onSelectUser: (userId: string) => void;
  onBalanceChange: (balance: number) => void;
  onUpdateBalance: () => void;
}

export default function AdminPanel({
  users,
  selectedUserId,
  newBalance,
  onSelectUser,
  onBalanceChange,
  onUpdateBalance,
}: AdminPanelProps) {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Manage Users
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-slate-300">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300">
                      Full Name
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300">Role</th>
                    <th className="text-center py-3 px-4 text-slate-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className={`border-b border-slate-700 cursor-pointer hover:bg-slate-700 transition ${
                        selectedUserId === user.id ? "bg-slate-700" : ""
                      }`}
                      onClick={() => onSelectUser(user.id)}
                    >
                      <td className="py-3 px-4 text-slate-200">{user.email}</td>
                      <td className="py-3 px-4 text-slate-200">
                        {user.fullName}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === "admin"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectUser(user.id);
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Update Balance Panel */}
          <div className="bg-slate-800 rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Update Balance
            </h2>
            {selectedUserId ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Selected User ID
                  </label>
                  <p className="bg-slate-700 p-3 rounded text-slate-200 text-sm break-all">
                    {selectedUserId}
                  </p>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    New Balance (USD)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter balance amount"
                    value={newBalance}
                    onChange={(e) =>
                      onBalanceChange(parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    min="0"
                    step="0.01"
                  />
                </div>
                <Button
                  onClick={onUpdateBalance}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
                >
                  Update Balance
                </Button>
              </div>
            ) : (
              <p className="text-slate-400">
                Select a user to update their balance
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
