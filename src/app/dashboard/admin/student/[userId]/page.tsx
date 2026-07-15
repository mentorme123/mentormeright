"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Overrides {
  academicFitness?: Record<string, number>;
  careerPathReadiness?: Record<string, number>;
  counselorRecommendations?: string[];
}

export default function AdminStudentEditPage({ searchParams }: { searchParams: { userId?: string } }) {
  const router = useRouter();
  const userId = searchParams?.userId || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [originalOverrides, setOriginalOverrides] = useState<Overrides>({});

  if (!userId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Error</h2>
          <p className="text-slate-600 mb-6">User ID is required</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft size={16} className="mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/user-scores?userId=${encodeURIComponent(userId)}`);
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Failed to load assessment");
          setLoading(false);
          return;
        }

        const existingOverrides = json.report?.adminOverrides || {};
        setOverrides(existingOverrides);
        setOriginalOverrides(existingOverrides);
      } catch {
        setError("Failed to load assessment data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/admin/user-scores?userId=${encodeURIComponent(userId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, overrides })
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to save overrides");
      } else {
        setSuccess("Overrides saved successfully");
        setOriginalOverrides(overrides);
      }
    } catch {
      setError("Failed to save overrides");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setOverrides(originalOverrides);
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading student dashboard editor...</p>
        </div>
      </div>
    );
  }

  const academicFitness = overrides.academicFitness || {};
  const careerPathReadiness = overrides.careerPathReadiness || {};
  const counselorRecs = overrides.counselorRecommendations || [];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-slate-800">Student Dashboard Editor</h1>
              <p className="text-slate-500 text-sm mt-1">Update the student&apos;s dashboard sections below. Changes will be reflected immediately on the student dashboard.</p>
            </div>
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm">
              {success}
            </div>
          )}

          <div className="space-y-8">
            {/* Academic Fitness / Career Match Index */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-black text-slate-800 mb-4">Career Match Index</h3>
              <p className="text-xs text-slate-500 mb-4">Enter percentage values (0-100) for each subject/career area.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(academicFitness).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{key}</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => setOverrides({
                        ...overrides,
                        academicFitness: { ...academicFitness, [key]: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                  </div>
                ))}
                {Object.keys(academicFitness).length === 0 && (
                  <p className="text-sm text-slate-500 col-span-2">No existing data. Add new entries below.</p>
                )}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Add New Subject</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Subject name"
                      id="new-subject-name"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="%"
                      id="new-subject-value"
                      className="w-20 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        const nameInput = document.getElementById('new-subject-name') as HTMLInputElement;
                        const valueInput = document.getElementById('new-subject-value') as HTMLInputElement;
                        const name = nameInput.value.trim();
                        const value = parseInt(valueInput.value) || 0;
                        if (name) {
                          setOverrides({
                            ...overrides,
                            academicFitness: { ...academicFitness, [name]: Math.min(100, Math.max(0, value)) }
                          });
                          nameInput.value = '';
                          valueInput.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Path Readiness */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-black text-slate-800 mb-4">Career Path Readiness</h3>
              <p className="text-xs text-slate-500 mb-4">Enter percentage values (0-100) for each career path.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(careerPathReadiness).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{key}</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => setOverrides({
                        ...overrides,
                        careerPathReadiness: { ...careerPathReadiness, [key]: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                  </div>
                ))}
                {Object.keys(careerPathReadiness).length === 0 && (
                  <p className="text-sm text-slate-500 col-span-2">No existing data. Add new entries below.</p>
                )}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Add New Career Path</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Career path name"
                      id="new-career-name"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="%"
                      id="new-career-value"
                      className="w-20 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        const nameInput = document.getElementById('new-career-name') as HTMLInputElement;
                        const valueInput = document.getElementById('new-career-value') as HTMLInputElement;
                        const name = nameInput.value.trim();
                        const value = parseInt(valueInput.value) || 0;
                        if (name) {
                          setOverrides({
                            ...overrides,
                            careerPathReadiness: { ...careerPathReadiness, [name]: Math.min(100, Math.max(0, value)) }
                          });
                          nameInput.value = '';
                          valueInput.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Counselor Recommendations */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-black text-slate-800 mb-4">Counselor Recommendations</h3>
              <p className="text-xs text-slate-500 mb-4">Add or update recommendation items. Each item will appear as a bullet point on the student dashboard.</p>
              <div className="space-y-3">
                {counselorRecs.map((rec, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={rec}
                      onChange={(e) => {
                        const newRecs = [...counselorRecs];
                        newRecs[index] = e.target.value;
                        setOverrides({
                          ...overrides,
                          counselorRecommendations: newRecs
                        });
                      }}
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newRecs = counselorRecs.filter((_, i) => i !== index);
                        setOverrides({
                          ...overrides,
                          counselorRecommendations: newRecs
                        });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {counselorRecs.length === 0 && (
                  <p className="text-sm text-slate-500">No recommendations yet. Add your first one below.</p>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setOverrides({
                      ...overrides,
                      counselorRecommendations: [...counselorRecs, ""]
                    });
                  }}
                  className="mt-2"
                >
                  + Add Recommendation
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
            <Button variant="ghost" onClick={handleReset} disabled={saving}>
              Reset
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
