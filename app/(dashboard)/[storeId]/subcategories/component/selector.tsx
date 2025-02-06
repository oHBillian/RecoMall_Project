"use client";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MainCategoriesType } from "../../categories/component/columns";

interface Selectorprops {
    data: MainCategoriesType[];
  }
const Selector:React.FC<Selectorprops> = ({data}) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">Category name</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            
            {value
              ? data.find((category) => category.id.toString() === value)?.name
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-white">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={(currentValue) => {
                      const selectedCategory = data.find(
                        (category) => category.name === currentValue
                      );
                      setValue(
                        selectedCategory ? selectedCategory.id.toString() : ""
                      );
                      setOpen(false);
                    }}
                    // onSelect={(currentValue) => {
                    //   setValue(currentValue === value ? "" : currentValue)
                    //   setOpen(false)
                    // }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.id.toString()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Selector;
