"use client";

import { Todo } from "@/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-tertiary">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-text-tertiary"
                    >
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                        <rect x="9" y="3" width="6" height="4" rx="1" />
                        <path d="M9 14l2 2 4-4" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-text-secondary">
                    No tasks yet
                </p>
                <p className="mt-1 text-xs text-text-tertiary">
                    Create your first task to get started
                </p>
            </div>
        );
    }

    return (
        <ul className="w-full divide-y divide-border-subtle">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
