"use client";

import { Todo } from "@/types";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <li className="group flex items-center gap-3 rounded-lg border border-transparent px-4 py-3 transition-all duration-150 hover:border-border-subtle hover:bg-bg-hover animate-slide-down">
            {/* Custom checkbox */}
            <button
                onClick={() => onToggle(todo.id)}
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all duration-200 ${todo.completed
                        ? "border-success bg-success"
                        : "border-text-tertiary hover:border-accent hover:bg-accent-muted"
                    }`}
                aria-label={todo.completed ? "Mark as active" : "Mark as done"}
            >
                {todo.completed && (
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="animate-checkmark"
                    >
                        <path
                            d="M8.5 2.5L3.875 7.5L1.5 5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </button>

            {/* Task text */}
            <span
                className={`flex-1 text-sm leading-relaxed transition-all duration-200 ${todo.completed
                        ? "text-text-tertiary line-through"
                        : "text-text-primary"
                    }`}
            >
                {todo.text}
            </span>

            {/* Date */}
            <span className="hidden shrink-0 text-[10px] text-text-tertiary sm:block">
                {new Date(todo.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })}
            </span>

            {/* Delete button */}
            <button
                onClick={() => onDelete(todo.id)}
                className="shrink-0 rounded-md p-1 text-text-tertiary opacity-0 transition-all duration-150 hover:bg-danger-muted hover:text-danger group-hover:opacity-100"
                aria-label="Delete task"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                >
                    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" />
                </svg>
            </button>
        </li>
    );
}
