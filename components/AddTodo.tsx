"use client";

import { useState } from "react";

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-3 rounded-xl border bg-bg-secondary px-4 py-3 transition-all duration-200 ${isFocused
                    ? "border-accent shadow-[0_0_0_3px_var(--color-accent-muted)]"
                    : "border-border-default hover:border-border-default"
                }`}
        >
            {/* Plus icon */}
            <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-tertiary">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                        d="M9 3.75V14.25M3.75 9H14.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Add a new task..."
                className="min-w-0 flex-1 bg-transparent text-sm text-text-primary placeholder-text-tertiary outline-none"
            />

            {text.trim() && (
                <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover animate-fade-in"
                >
                    Add
                </button>
            )}
        </form>
    );
}
