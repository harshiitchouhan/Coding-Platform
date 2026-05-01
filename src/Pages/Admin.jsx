import { useNavigate, useLocation } from "react-router";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const cards = [
    {
      key: "create",
      title: "Create Problem",
      description: "Add a new DSA problem",
      icon: Plus,
      color: "text-green-400",
      ring: "ring-green-500/20",
      route: "/admin/create",
    },
    {
      key: "update",
      title: "Update Problem",
      description: "Edit existing problems",
      icon: Edit,
      color: "text-yellow-400",
      ring: "ring-yellow-500/20",
      route: "/admin/update",
    },
    {
      key: "delete",
      title: "Delete Problem",
      description: "Remove problems permanently",
      icon: Trash2,
      color: "text-red-400",
      ring: "ring-red-500/20",
      route: "/admin/delete",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center text-white
      bg-linear-to-br from-[#050816] via-[#071a3a] to-[#020617] p-6">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide mt-10">
        Admin Panel
      </h1>
      <h1 className="text-lg text-gray-300 md:text-2xl font-medium mb-10 tracking-wide">
        Manage Coding Problems On Your Platform
      </h1>

      {/* GLASS CARD WRAPPER */}
      <div className="w-full max-w-5xl p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-2xl shadow-black/40">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {cards.map((card) => {
            const Icon = card.icon;
            const isActive = location.pathname === card.route;

            return (
              <div
                key={card.key}
                onClick={() => navigate(card.route)}
                className={`group relative p-6 rounded-2xl border cursor-pointer
                transition-all duration-300
                hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl
                bg-white/5 backdrop-blur-md
                ${isActive ? "border-white/40 scale-[1.03] shadow-xl" : "border-white/10"}
                `}
              >
                {/* glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl bg-white/5"></div>

                {/* icon */}
                <div className="flex justify-center mb-5 relative z-10">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full
                    bg-black/30 ring-1 ${card.ring}
                    ${isActive ? "ring-2" : ""}`}
                  >
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-center mb-2 relative z-10">
                  {card.title}
                </h2>

                <p className="text-sm text-gray-400 text-center relative z-10">
                  {card.description}
                </p>

                {/* active dot */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}