-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "display_name" TEXT,
    "username" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notes" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parsed" JSONB,
    "source" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."decks" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."flashcards" (
    "id" UUID NOT NULL,
    "deckId" UUID,
    "noteId" UUID,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" UUID NOT NULL,
    "flashcardId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "result" INTEGER NOT NULL,
    "ease" DOUBLE PRECISION,
    "interval" INTEGER,
    "repetitions" INTEGER,
    "next_review" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quizzes" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_questions" (
    "id" UUID NOT NULL,
    "quizId" UUID NOT NULL,
    "prompt" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "answer_idx" INTEGER NOT NULL,
    "explanation" TEXT,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."study_sessions" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "duration_sec" INTEGER,
    "score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."note_tags" (
    "id" UUID NOT NULL,
    "noteId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "note_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "public"."profiles"("username");

-- CreateIndex
CREATE INDEX "notes_userId_idx" ON "public"."notes"("userId");

-- CreateIndex
CREATE INDEX "decks_userId_idx" ON "public"."decks"("userId");

-- CreateIndex
CREATE INDEX "flashcards_deckId_idx" ON "public"."flashcards"("deckId");

-- CreateIndex
CREATE INDEX "flashcards_noteId_idx" ON "public"."flashcards"("noteId");

-- CreateIndex
CREATE INDEX "reviews_flashcardId_idx" ON "public"."reviews"("flashcardId");

-- CreateIndex
CREATE INDEX "reviews_userId_idx" ON "public"."reviews"("userId");

-- CreateIndex
CREATE INDEX "quizzes_userId_idx" ON "public"."quizzes"("userId");

-- CreateIndex
CREATE INDEX "quiz_questions_quizId_idx" ON "public"."quiz_questions"("quizId");

-- CreateIndex
CREATE INDEX "study_sessions_userId_idx" ON "public"."study_sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "public"."tags"("name");

-- CreateIndex
CREATE INDEX "note_tags_noteId_idx" ON "public"."note_tags"("noteId");

-- CreateIndex
CREATE INDEX "note_tags_tagId_idx" ON "public"."note_tags"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "note_tags_noteId_tagId_key" ON "public"."note_tags"("noteId", "tagId");

-- AddForeignKey
ALTER TABLE "public"."notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."decks" ADD CONSTRAINT "decks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."flashcards" ADD CONSTRAINT "flashcards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."decks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."flashcards" ADD CONSTRAINT "flashcards_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."notes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "public"."flashcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_questions" ADD CONSTRAINT "quiz_questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."note_tags" ADD CONSTRAINT "note_tags_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."note_tags" ADD CONSTRAINT "note_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
