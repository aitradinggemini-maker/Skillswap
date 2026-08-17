"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { Search, Sparkles, Filter, Coins } from "lucide-react";

export default function OfferSkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Offer Skills</h1>
          <p className="text-sm text-slate-600 mt-1">
            Discover SkillTasks posted by other students, apply with your skills, and earn SkillCredits.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              placeholder="Search tasks by skill or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                { label: "All Categories", value: "all" },
                { label: "Programming", value: "programming" },
                { label: "Design", value: "design" },
                { label: "Math & Science", value: "math" },
                { label: "Writing", value: "writing" },
              ]}
            />
          </div>
        </div>

        {/* Sample Task Listings Architecture Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card hoverable className="border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="indigo">Programming</Badge>
                <div className="flex items-center gap-1 text-amber-800 font-semibold text-xs bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>50 Credits</span>
                </div>
              </div>
              <CardTitle className="text-base mt-2">
                React & TypeScript State Management Refactoring
              </CardTitle>
              <CardDescription className="line-clamp-2">
                Need help cleaning up Context API state and converting prop drilling into clean custom hooks for a senior project.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-slate-500 flex items-center justify-between">
              <StatusIndicator status="OPEN" />
              <span>Posted by Jane D. • 2 hours ago</span>
            </CardContent>
          </Card>

          <Card hoverable className="border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="emerald">Design</Badge>
                <div className="flex items-center gap-1 text-amber-800 font-semibold text-xs bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>35 Credits</span>
                </div>
              </div>
              <CardTitle className="text-base mt-2">
                Figma UI Wireframing for Mobile Campus App
              </CardTitle>
              <CardDescription className="line-clamp-2">
                Looking for a designer to create 4 mobile screen wireframes in Figma for a student startup pitch.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-slate-500 flex items-center justify-between">
              <StatusIndicator status="OPEN" />
              <span>Posted by Alex M. • 5 hours ago</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
