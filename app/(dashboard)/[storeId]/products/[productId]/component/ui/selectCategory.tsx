"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { setIdCategory, setIdSubCategory } from "@/lib/slices/subCategoryValue";

interface Selectorprops {
  categories: {
    id: number;
    name: string;
  }[];
  defaultSelected?: number;
  onSelect: (categoryId: string) => void;
}

const SelecCategoryProduct: React.FC<Selectorprops> = memo(({ 
  categories,
  defaultSelected,
  onSelect
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    // Only set initial values if defaultSelected exists and value is empty
    if (defaultSelected && !value) {
      const defaultValue = defaultSelected.toString();
      setValue(defaultValue);
      dispatch(setIdCategory(defaultSelected));
      onSelect(defaultValue);
    }
  }, [defaultSelected, dispatch, onSelect, value]);// Only depend on defaultSelected

  const handleSelect = useCallback(
    (currentValue: string) => {
      const selectedCategory = categories.find(
        (category) => category.name === currentValue
      );

      if (selectedCategory) {
        const newValue = selectedCategory.id.toString();
        setValue(newValue);
        dispatch(setIdCategory(selectedCategory.id));
        dispatch(setIdSubCategory(null)); 
        onSelect(newValue);
      }

      setOpen(false);
    },
    [categories, dispatch, onSelect]
  );

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
              ? categories.find((category) => category.id.toString() === value)?.name
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
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={handleSelect}
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
});

SelecCategoryProduct.displayName = "Selector";

export default SelecCategoryProduct;