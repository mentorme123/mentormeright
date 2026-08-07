"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Mail, Phone, User, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  phone: string | null;
  gender: string | null;
  country: string | null;
  state: string | null;
  education_level: string | null;
  created_at: string;
  updated_at: string;
}

export default function AdminProfileContent() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formPhone, setFormPhone] = useState("");
  const [formGender, setFormGender] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formState, setFormState] = useState("");
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!userProfile) {
        router.push("/login");
        return;
      }

      setProfile(userProfile);
      setFormPhone(userProfile?.phone || "");
      setFormGender(userProfile?.gender || "");
      setFormCountry(userProfile?.country || "");
      setFormState(userProfile?.state || "");
      setLoading(false);
    }
    loadProfile();
  }, [supabase, router]);

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('users')
      .update({
        phone: formPhone || null,
        gender: formGender || null,
        country: formCountry || null,
        state: formState || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', profile?.id || '');

    if (error) {
      alert("Failed to save profile. Please try again.");
      console.error(error);
    } else {
      const { data: updatedProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', profile?.id || '')
        .maybeSingle();

      if (updatedProfile) {
        setProfile(updatedProfile);
        setShowEditModal(false);
      }
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8">
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Edit Profile</h2>
                  <p className="text-slate-500 text-sm mt-1">Update your personal information.</p>
                </div>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1 block">Gender</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-1 block">Country</label>
                    <input
                      type="text"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      placeholder="India"
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-1 block">State</label>
                    <input
                      type="text"
                      value={formState}
                      onChange={(e) => setFormState(e.target.value)}
                      placeholder="Karnataka"
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl mt-4 shadow-lg"
                >
                  {saving ? <><Loader2 className="animate-spin mr-2" size={16} /> Saving...</> : "Save Changes"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-800">My Profile</h1>
            <p className="text-slate-500">Manage your admin account settings.</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-slate-700 border border-slate-200 font-bold px-6 py-3 rounded-xl transition-all"
          >
            <LogOut className="inline mr-2" size={16} />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <User size={20} className="text-brand-blue" /> Admin Information
            </h3>
            <button
              onClick={() => setShowEditModal(true)}
              className="text-xs font-bold text-brand-blue hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: <Mail size={14} />, label: "Email", value: profile?.email },
              { icon: <Phone size={14} />, label: "Phone", value: profile?.phone },
              { icon: <User size={14} />, label: "Role", value: "Admin" },
            ].filter(item => item.value).map((item, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </div>
                <p className="text-sm font-bold text-slate-700 truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}