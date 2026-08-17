"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FolderOpen, Code, FileText, ExternalLink, Plus } from "lucide-react";

export default function ResourcesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Resource Sharing</h1>
            <p className="text-sm text-slate-600 mt-1">
              Share and discover peer study notes, code repositories, cheatsheets, and project templates.
            </p>
          </div>
          <Button size="sm" className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Share Resource</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card hoverable>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="indigo" size="sm">
                  <Code className="w-3 h-3 mr-1" /> Code Repository
                </Badge>
                <span className="text-xs text-slate-400">Public</span>
              </div>
              <CardTitle className="text-base mt-2">Next.js & Prisma Starter Template</CardTitle>
              <CardDescription>
                A clean, pre-configured Next.js template with Auth and SQLite database setup for student hackathons.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 flex items-center justify-between text-xs text-slate-500">
              <span>Shared by Skillswap Team</span>
              <button className="flex items-center gap-1 text-indigo-600 font-semibold hover:underline">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>

          <Card hoverable>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="amber" size="sm">
                  <FileText className="w-3 h-3 mr-1" /> Notes & Guides
                </Badge>
                <span className="text-xs text-slate-400">Public</span>
              </div>
              <CardTitle className="text-base mt-2">Data Structures & Algorithms Cheat Sheet</CardTitle>
              <CardDescription>
                Comprehensive summary notes covering Trees, Graphs, Dynamic Programming, and Big-O Time Complexity.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 flex items-center justify-between text-xs text-slate-500">
              <span>Shared by CS Peer Tutor</span>
              <button className="flex items-center gap-1 text-indigo-600 font-semibold hover:underline">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
