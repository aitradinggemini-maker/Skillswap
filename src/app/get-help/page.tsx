"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { HelpCircle, PlusCircle, Clock } from "lucide-react";

export default function GetHelpPage() {
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Get Help</h1>
            <p className="text-sm text-slate-600 mt-1">
              Post a SkillTask request, specify SkillCredits offered, and let peer experts assist you.
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showCreateForm ? "Cancel" : "Post New Task"}</span>
          </Button>
        </div>

        {showCreateForm && (
          <Card className="border-indigo-200 shadow-md">
            <CardHeader>
              <CardTitle>Create a SkillTask Request</CardTitle>
              <CardDescription>
                Describe what you need help with and set an escrow credit bounty.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Task Title" placeholder="e.g. Help debugging Next.js App Router state issue" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  options={[
                    { label: "Programming & Web", value: "programming" },
                    { label: "Design & UX", value: "design" },
                    { label: "Mathematics & Statistics", value: "math" },
                    { label: "Writing & Proofreading", value: "writing" },
                  ]}
                />
                <Input label="SkillCredits Offered" type="number" defaultValue="30" />
              </div>
              <Textarea
                label="Detailed Task Requirements"
                placeholder="Explain what needs to be accomplished, deadline, and expected deliverables..."
                rows={4}
              />
            </CardContent>
            <CardFooter className="justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button>Submit SkillTask</Button>
            </CardFooter>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Active Help Requests</CardTitle>
            <CardDescription>Tasks you have created that are open or in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<HelpCircle className="w-8 h-8 text-indigo-500" />}
              title="No active help requests"
              description="You haven't requested help with any tasks yet. Create a SkillTask to start getting help from campus peers."
              action={
                <Button size="sm" onClick={() => setShowCreateForm(true)}>
                  Create Your First Task
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
