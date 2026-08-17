"use client";

import React, { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { User, Award, CheckCircle, Plus, Star } from "lucide-react";

interface ProfileData {
  id: string;
  email: string;
  fullName: string;
  university: string;
  major: string;
  balance: number;
  ratingAverage: number;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <LoadingState message="Loading profile..." />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-3xl shadow-md shrink-0">
                {userData?.fullName ? userData.fullName.charAt(0) : "U"}
              </div>
              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">{userData?.fullName || "Student User"}</h1>
                  <Badge variant="indigo" size="sm" className="w-fit self-center sm:self-auto">
                    Verified Student
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">{userData?.email}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-1">
                  <span>🏫 {userData?.university || "University"}</span>
                  <span>🎓 {userData?.major || "Major"}</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {userData?.ratingAverage ? userData.ratingAverage.toFixed(1) : "5.0"} Reputation
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verified Skills Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Listed & Verified Skills</CardTitle>
                <CardDescription>Skills you can offer to solve SkillTasks</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next.js & React (Advanced)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>TypeScript (Intermediate)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-slate-500" />
                <span>UI Design (Beginner)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
