"use client";

import { useState, useMemo } from "react";
import { Acessorio } from "../types/acessorio";

export function useAcessorios(initialAcessorios: Acessorio[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(() => {
    const cats = new Set(initialAcessorios.map(a => a.category));
    return ["Todos", ...Array.from(cats)];
  }, [initialAcessorios]);

  const filteredAcessorios = useMemo(() => {
    return initialAcessorios.filter(acessorio => {
      const matchesSearch = acessorio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            acessorio.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || acessorio.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialAcessorios, searchQuery, selectedCategory]);

  return {
    filteredAcessorios,
    categories,
    setSearchQuery,
    setSelectedCategory,
    selectedCategory
  };
}
