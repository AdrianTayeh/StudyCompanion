"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleGenerateFlashcards = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      router.push("/dashboard/flashcards");
    }, 2000);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-green-50/30">
      {/* Top Bar */}
      <header className="bg-white border-b border-border px-8 py-4">
        <div>
          <h1>Create New Note</h1>
          <p className="text-muted-foreground">Upload or write your study notes</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <h3 className="mb-4">Upload Notes</h3>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging
                  ? "border-purple-500 bg-purple-50"
                  : "border-border bg-accent/50 hover:border-purple-300"
              }`}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="mb-2">Drag and drop your files here</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <label>
                <Button variant="outline" className="rounded-xl" asChild>
                  <span>Browse Files</span>
                </Button>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileInput}
                />
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Supported: PDF, DOC, DOCX, TXT
              </p>
            </div>

            {uploadedFile && (
              <div className="mt-4 p-4 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </Card>

          {/* Text Editor Section */}
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <h3 className="mb-4">Or Type Your Notes</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-2">Note Title</label>
                <Input
                  id="title"
                  placeholder="e.g., Biology Chapter 5 - Cell Structure"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label htmlFor="content" className="block mb-2">Content</label>
                <Textarea
                  id="content"
                  placeholder="Start typing your notes here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="rounded-xl min-h-[300px] resize-none"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="rounded-full">Biology</Badge>
                <Badge variant="outline" className="rounded-full">Chapter 5</Badge>
                <button className="text-sm text-purple-600 hover:text-purple-700">
                  + Add tag
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-end">
          <Button variant="outline" size="lg" className="rounded-xl">
            Save as Draft
          </Button>
          <Button
            size="lg"
            onClick={handleGenerateFlashcards}
            disabled={!noteContent && !uploadedFile || isGenerating}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Flashcards
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
