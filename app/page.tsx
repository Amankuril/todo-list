"use client";

import { useState, useEffect, useMemo } from "react";
import { Todo } from "@/types";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

type Filter = "all" | "active" | "completed";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error("Failed to parse todos", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Done" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-text-primary">
              Taskflow
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-accent-muted px-2.5 py-1 font-medium text-accent">
              {activeCount} active
            </span>
            {completedCount > 0 && (
              <span className="rounded-full bg-success-muted px-2.5 py-1 font-medium text-success">
                {completedCount} done
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        {/* Add Todo */}
        <AddTodo onAdd={addTodo} />

        {/* Filter Bar */}
        <div className="mt-8 mb-4 flex items-center justify-between">
          <div className="flex gap-1 rounded-lg bg-bg-secondary p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${filter === f.key
                    ? "bg-bg-tertiary text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs font-medium text-text-tertiary transition-colors hover:text-danger"
            >
              Clear completed
            </button>
          )}
        </div>

        {/* List */}
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-6 text-center text-xs text-text-tertiary">
        Built with Next.js, TypeScript & Tailwind CSS
      </footer>
    </div>
  );
}
