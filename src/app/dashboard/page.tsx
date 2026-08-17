"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HelpCircle, Sparkles, FolderOpen, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="max-w-2xl space-y-2">
            <Badge variant="sky" size="sm" className="bg-white/10 text-white border-white/20">
              Student Skill Exchange Platform
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome to Skillswap
            </h1>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Find help with complex coursework, offer your technical expertise, and earn SkillCredits in a safe, peer-to-peer ecosystem.
            </p>
            <div className="pt-3 flex flex-wrap gap-3">
              <Link href="/get-help">
                <Button variant="secondary" size="sm" className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold">
                  Post SkillTask
                </Button>
              </Link>
              <Link href="/offer-skills">
                <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                  Explore Open Tasks
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable className="flex flex-col justify-between">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <HelpCircle className="w-5 h-5" />
              </div>
              <CardTitle>Get Help</CardTitle>
              <CardDescription>
                Need assistance with assignment debugging, tutoring, or design?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/get-help" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                <span>Request help with a task</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          <Card hoverable className="flex flex-col justify-between">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <CardTitle>Offer Skills</CardTitle>
              <CardDescription>
                Browse student requests, solve challenges, and accumulate SkillCredits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/offer-skills" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                <span>Browse open tasks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          <Card hoverable className="flex flex-col justify-between">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
                <FolderOpen className="w-5 h-5" />
              </div>
              <CardTitle>Shared Resources</CardTitle>
              <CardDescription>
                Access verified study notes, code templates, and project repositories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources" className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700">
                <span>View resource bank</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Architecture & Flow Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Core Skillswap Architecture Flow</CardTitle>
            <CardDescription>How the future modular flow will connect</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 font-semibold text-indigo-600">
                <Zap className="w-4 h-4" />
                <span>1. User Skills</span>
              </div>
              <span className="text-slate-300">→</span>
              <div className="flex items-center gap-1.5">
                <span>2. SkillTask</span>
              </div>
              <span className="text-slate-300">→</span>
              <div className="flex items-center gap-1.5">
                <span>3. Discovery</span>
              </div>
              <span className="text-slate-300">→</span>
              <div className="flex items-center gap-1.5">
                <span>4. DealChat</span>
              </div>
              <span className="text-slate-300">→</span>
              <div className="flex items-center gap-1.5">
                <span>5. Agreement</span>
              </div>
              <span className="text-slate-300">→</span>
              <div className="flex items-center gap-1.5 font-semibold text-amber-600">
                <ShieldCheck className="w-4 h-4" />
                <span>6. SkillCredits Escrow</span>
              </div>
              <span className="text-slate-300">→</span>
              <div className="flex items-center gap-1.5">
                <span>7. Rating & Reputation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
