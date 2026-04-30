"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock, Users, Calendar, ArrowRight, Loader2, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type Counsellor = {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  experience_years: number;
  rating: number;
  price_per_session: number;
  avatar_url: string | null;
  is_active: boolean;
};

type Slot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
};

export default function CounsellorMarketplace() {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    async function fetchCounsellors() {
      const { data, error } = await supabase
        .from("counsellors")
        .select("*")
        .eq("is_active", true)
        .order("rating", { ascending: false });
      if (!error && data) setCounsellors(data);
      setLoading(false);
    }
    fetchCounsellors();
  }, [supabase]);

  async function openBookingModal(counsellor: Counsellor) {
    setSelectedCounsellor(counsellor);
    setSelectedSlot(null);
    setBookingSuccess(false);
    setBookingError("");
    setSlotsLoading(true);

    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("slots")
      .select("*")
      .eq("counsellor_id", counsellor.id)
      .eq("is_booked", false)
      .gte("date", today)
      .order("date")
      .order("start_time");
    setSlots(data || []);
    setSlotsLoading(false);
  }

  async function confirmBooking() {
    if (!selectedSlot || !selectedCounsellor) return;
    setBooking(true);
    setBookingError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setBookingError("Please log in to book a session.");
      setBooking(false);
      return;
    }

    try {
      // 1. Create Razorpay order for ₹4999
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 4999 })
      });
      const order = await orderRes.json();

      if (!order || !order.id) {
        throw new Error("Failed to initialize payment gateway.");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "dummy_key",
        amount: order.amount,
        currency: order.currency,
        name: "MentorMe",
        description: `Counseling Session with ${selectedCounsellor.name}`,
        order_id: order.id,
        handler: async function () {
          // PAYMENT SUCCESS - CREATE BOOKING
          try {
            const jitsiLink = `https://meet.jit.si/MentorMe-${selectedCounsellor.id.slice(0, 6)}-${selectedSlot.id.slice(0, 6)}`;

            const { data: bookingData, error: bookingError } = await supabase
              .from("bookings")
              .insert({
                user_id: user.id,
                counsellor_id: selectedCounsellor.id,
                slot_id: selectedSlot.id,
                status: "confirmed",
                jitsi_link: jitsiLink,
              })
              .select("id")
              .single();

            if (bookingError) throw bookingError;

            // Mark slot as booked
            await supabase.from("slots").update({ is_booked: true }).eq("id", selectedSlot.id);

            // Send confirmation email
            await fetch("/api/email/booking-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId: bookingData.id,
                userId: user.id,
                counselorId: selectedCounsellor.id,
                slotId: selectedSlot.id,
              }),
            });

            setBookingSuccess(true);
          } catch (err) {
            console.error(err);
            setBookingError("Payment succeeded but booking failed. Contact support.");
          } finally {
            setBooking(false);
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#0F52BA", // brand blue
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const razorpay = new (window as any).Razorpay(options);
      razorpay.on('payment.failed', function () {
        setBookingError("Payment failed. Please try again.");
        setBooking(false);
      });
      razorpay.open();

    } catch (error) {
      if (error instanceof Error) {
        setBookingError(error.message);
      } else {
        setBookingError("An unknown error occurred.");
      }
      setBooking(false);
    }
  }

  const filtered = counsellors.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16 px-4 mb-10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-2 bg-brand-orange/10 text-brand-orange font-black text-xs uppercase tracking-widest rounded-full">World-Class Experts</span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mt-4">
              Meet Your <span className="text-brand-blue">Career Counsellors</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mt-4">
              Book a 1-on-1 session with our top-rated freelance counsellors. Real experts, real guidance, real results.
            </p>
          </motion.div>
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-brand-blue animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 space-y-4">
            <Users className="mx-auto text-slate-300" size={64} />
            <h3 className="text-2xl font-black text-slate-700">No Counsellors Found</h3>
            <p className="text-slate-500">
              {counsellors.length === 0
                ? "Our counsellors are being onboarded. Check back soon!"
                : "No counsellors match your search. Try a different term."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((counsellor, i) => (
              <motion.div
                key={counsellor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-brand-blue/10 transition-all group"
              >
                <div className="h-3 bg-gradient-to-r from-brand-blue to-brand-orange"></div>
                <div className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
                      {counsellor.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-xl text-slate-800 truncate group-hover:text-brand-blue transition-colors">{counsellor.name}</h3>
                      <p className="text-brand-orange font-bold text-sm">{counsellor.specialization}</p>
                    </div>
                  </div>

                  {counsellor.bio && (
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{counsellor.bio}</p>
                  )}

                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="font-black text-slate-800">{counsellor.rating?.toFixed(1) ?? "New"}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Rating</p>
                    </div>
                    <div className="text-center border-x border-slate-100">
                      <div className="font-black text-slate-800 flex items-center justify-center gap-1">
                        <Clock size={14} className="text-brand-blue" />
                        {counsellor.experience_years ?? 0}yr
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Experience</p>
                    </div>
                    <div className="text-center">
                      <div className="font-black text-brand-blue">
                        {counsellor.price_per_session === 0 ? "Free" : `₹${counsellor.price_per_session}`}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Per session</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => openBookingModal(counsellor)}
                    className="w-full py-6 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-base rounded-2xl shadow-lg shadow-brand-blue/20 transition-all hover:scale-[1.02]"
                  >
                    Book a Session <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedCounsellor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10 rounded-t-3xl">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Book a Session</h2>
                <p className="text-brand-blue font-bold">with {selectedCounsellor.name}</p>
              </div>
              <button
                onClick={() => setSelectedCounsellor(null)}
                className="p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {bookingSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">Booking Confirmed! 🎉</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    A confirmation email with your Jitsi video call link and a <strong>calendar invite (.ics)</strong> has been sent to your email. Check your inbox!
                  </p>
                  <Button
                    onClick={() => setSelectedCounsellor(null)}
                    className="bg-brand-blue text-white font-black px-10 py-4 rounded-2xl shadow-lg"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                      <Calendar size={20} className="text-brand-orange" /> Select an Available Slot
                    </h3>
                    {slotsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                      </div>
                    ) : slots.length === 0 ? (
                      <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                        <Clock className="mx-auto text-slate-300 mb-4" size={48} />
                        <p className="font-bold text-slate-600">No available slots right now.</p>
                        <p className="text-slate-400 text-sm mt-1">Please check back later or contact us.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {slots.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-4 rounded-2xl border-2 text-left transition-all ${
                              selectedSlot?.id === slot.id
                                ? "border-brand-blue bg-brand-blue/5 shadow-lg shadow-brand-blue/10"
                                : "border-slate-200 hover:border-brand-blue/30 hover:bg-slate-50"
                            }`}
                          >
                            <p className="font-black text-slate-800">{formatDate(slot.date)}</p>
                            <p className="text-sm font-bold text-brand-orange mt-1">
                              {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {bookingError && (
                    <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
                      {bookingError}
                    </div>
                  )}

                  <Button
                    onClick={confirmBooking}
                    disabled={!selectedSlot || booking}
                    className="w-full py-6 bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-lg rounded-2xl shadow-lg shadow-brand-orange/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                  >
                    {booking ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Confirming...</>
                    ) : (
                      <>Confirm Booking & Get Jitsi Link <ArrowRight size={18} className="ml-2" /></>
                    )}
                  </Button>
                  <p className="text-center text-sm text-slate-400">A calendar invite + video call link will be emailed to you instantly.</p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
