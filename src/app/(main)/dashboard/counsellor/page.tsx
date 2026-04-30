"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Video, Clock, Plus, Trash2, Loader2, CheckCircle, AlertCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  status: string;
  jitsi_link: string;
  created_at: string;
  users: { name: string; email: string };
  slots: { date: string; start_time: string; end_time: string };
};

type Slot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
};

type CounsellorProfile = {
  id: string;
  name: string;
  specialization: string;
  bio: string;
};

export default function CounsellorDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [profile, setProfile] = useState<CounsellorProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "slots">("bookings");

  // New slot form
  const [newDate, setNewDate] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [addingSlot, setAddingSlot] = useState(false);
  const [slotMsg, setSlotMsg] = useState("");

  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    // Check if counsellor exists by email
    const { data: profileData } = await supabase
      .from("counsellors")
      .select("id, name, specialization, bio")
      .eq("email", user.email)
      .single();

    if (!profileData) {
      setLoading(false);
      return;
    }

    setProfile(profileData);

    const [bookingsRes, slotsRes] = await Promise.all([
      supabase
        .from("bookings")
        .select("id, status, jitsi_link, created_at, users(name, email), slots(date, start_time, end_time)")
        .eq("counsellor_id", profileData.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("slots")
        .select("*")
        .eq("counsellor_id", profileData.id)
        .order("date")
        .order("start_time"),
    ]);

    if (bookingsRes.data) setBookings(bookingsRes.data as unknown as Booking[]);
    if (slotsRes.data) setSlots(slotsRes.data);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function addSlot() {
    if (!profile || !newDate || !newStart || !newEnd) return;
    setAddingSlot(true);
    setSlotMsg("");

    const { error } = await supabase.from("slots").insert({
      counsellor_id: profile.id,
      date: newDate,
      start_time: newStart,
      end_time: newEnd,
    });

    if (error) {
      setSlotMsg("Error: " + error.message);
    } else {
      setSlotMsg("Slot added successfully!");
      setNewDate(""); setNewStart(""); setNewEnd("");
      fetchData();
    }
    setAddingSlot(false);
  }

  async function deleteSlot(slotId: string) {
    await supabase.from("slots").delete().eq("id", slotId);
    fetchData();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-blue animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-slate-100 max-w-lg space-y-4">
          <AlertCircle className="mx-auto text-brand-orange" size={64} />
          <h2 className="text-3xl font-black text-slate-800">Not a Counsellor Account</h2>
          <p className="text-slate-500">Your account is not registered as a counsellor. Please contact admin if this is an error.</p>
          <Button onClick={() => router.push("/")} className="bg-brand-blue text-white font-bold px-8">Go Home</Button>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => b.status === "confirmed");

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 space-y-8">

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center text-white text-3xl font-black">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800">Welcome, {profile.name.split(" ")[0]} 👋</h1>
                <p className="text-brand-orange font-bold">{profile.specialization}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 font-bold text-slate-600">
              <LogOut size={18} /> Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="text-center">
              <p className="text-4xl font-black text-brand-blue">{upcomingBookings.length}</p>
              <p className="text-sm font-bold text-slate-500 mt-1">Upcoming Sessions</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-4xl font-black text-brand-orange">{slots.filter(s => !s.is_booked).length}</p>
              <p className="text-sm font-bold text-slate-500 mt-1">Open Slots</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-emerald-600">{bookings.filter(b => b.status === "completed").length}</p>
              <p className="text-sm font-bold text-slate-500 mt-1">Completed</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm w-fit">
          {(["bookings", "slots"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {tab === "bookings" ? "📅 My Bookings" : "🕐 Manage Slots"}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm space-y-4">
                <Calendar className="mx-auto text-slate-300" size={64} />
                <h3 className="text-2xl font-black text-slate-700">No Upcoming Sessions</h3>
                <p className="text-slate-400">Once students book with you, their sessions will appear here.</p>
              </div>
            ) : (
              upcomingBookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-black text-lg">
                      {booking.users?.name?.charAt(0) ?? "S"}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-lg">{booking.users?.name ?? "Student"}</p>
                      <p className="text-sm text-slate-500">{booking.users?.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} className="text-brand-orange" />
                        <span className="text-sm font-bold text-slate-600">
                          {booking.slots ? `${formatDate(booking.slots.date)} • ${formatTime(booking.slots.start_time)} – ${formatTime(booking.slots.end_time)}` : "Slot info unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-black text-xs rounded-full flex items-center gap-1">
                      <CheckCircle size={12} /> Confirmed
                    </span>
                    <a
                      href={booking.jitsi_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-black rounded-xl hover:bg-brand-blue/90 transition-all text-sm shadow-md shadow-brand-blue/20"
                    >
                      <Video size={16} /> Join Call
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Slots Tab */}
        {activeTab === "slots" && (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Add Slot Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6 sticky top-28">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Plus size={20} className="text-brand-orange" /> Add Available Slot
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Date</label>
                    <input
                      type="date"
                      value={newDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={e => setNewDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Start Time</label>
                      <input
                        type="time"
                        value={newStart}
                        onChange={e => setNewStart(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">End Time</label>
                      <input
                        type="time"
                        value={newEnd}
                        onChange={e => setNewEnd(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                      />
                    </div>
                  </div>
                </div>
                {slotMsg && (
                  <p className={`text-sm font-bold p-3 rounded-xl ${slotMsg.startsWith("Error") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"}`}>
                    {slotMsg}
                  </p>
                )}
                <Button
                  onClick={addSlot}
                  disabled={addingSlot || !newDate || !newStart || !newEnd}
                  className="w-full py-4 bg-brand-orange text-white font-black rounded-xl shadow-lg shadow-brand-orange/20 hover:bg-brand-orange/90"
                >
                  {addingSlot ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Add Slot"}
                </Button>
              </div>
            </div>

            {/* Slots List */}
            <div className="lg:col-span-3 space-y-3">
              {slots.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm space-y-3">
                  <Clock className="mx-auto text-slate-300" size={64} />
                  <h3 className="text-xl font-black text-slate-700">No Slots Added Yet</h3>
                  <p className="text-slate-400">Use the form to add your availability. Students will see these slots when booking.</p>
                </div>
              ) : (
                slots.map(slot => (
                  <div
                    key={slot.id}
                    className={`bg-white rounded-2xl p-5 border flex items-center justify-between ${slot.is_booked ? "border-brand-orange/30 bg-orange-50/50" : "border-slate-200"}`}
                  >
                    <div>
                      <p className="font-black text-slate-800">{formatDate(slot.date)}</p>
                      <p className="text-sm font-bold text-brand-blue">{formatTime(slot.start_time)} – {formatTime(slot.end_time)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${slot.is_booked ? "bg-brand-orange/10 text-brand-orange" : "bg-emerald-100 text-emerald-700"}`}>
                        {slot.is_booked ? "Booked" : "Available"}
                      </span>
                      {!slot.is_booked && (
                        <button
                          onClick={() => deleteSlot(slot.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
