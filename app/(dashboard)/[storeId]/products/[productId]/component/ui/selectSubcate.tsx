"use client";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setIdSubCategory } from "@/lib/slices/subCategoryValue";

interface SelectorProps {
  subcategories: {
    id: number;
    name: string;
    categoriesId?: number;
    categoryName: string;
  }[];
  defaultSelected?: number;
  onSelect: (categoryId: string) => void;
}

const SelecSubCategoryProduct: React.FC<SelectorProps> = memo(
  ({ subcategories, defaultSelected,onSelect }) => {
    // เด่ะมาแก้ต่อเรื่องกดแล้วมัน rerender เรื่อยๆ
    const [disabled,setDisabled] = useState(false)
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    

    const selectedCategoryId = useSelector(
      (state: RootState) => state.selectorValue.categoryId
    );
    const prevValueRef = useRef(selectedCategoryId);

    const filteredSubcategories = useMemo(() => 
      subcategories.filter(subcategory => subcategory.categoriesId === selectedCategoryId)
    , [subcategories, selectedCategoryId]);

    // ตรวจว่ามี CategoryId ไม่ถ้ายังไม่เลือกก็ให้ปิด popover 
    useEffect(() => {
      setDisabled(!selectedCategoryId);
      if (selectedCategoryId && !defaultSelected) {
        setValue("");
        dispatch(setIdSubCategory(null));
      }
    }, [selectedCategoryId, defaultSelected, dispatch]);

    //ถ้ามี defaultSelected ที่เลือกให้เปลี่ยน value เป็นค่านั้นๆ
    useEffect(() => {
      if (defaultSelected && !value) {
        const defaultValue = defaultSelected.toString();
        setValue(defaultValue);
        dispatch(setIdSubCategory(defaultSelected));
        onSelect(defaultValue);
      }
    }, [defaultSelected, dispatch, onSelect, value]);

    const handleSelect = (selectedValue: string) => {
      const selectedSubcategory = filteredSubcategories.find(
        (subcategory) => subcategory.name === selectedValue
      );
    
      if (selectedSubcategory) {
        const newValue = selectedSubcategory.id.toString();
        dispatch(setIdSubCategory(selectedSubcategory.id))
        // ตรวจสอบว่าค่าใหม่เปลี่ยนมั้ย
        if (prevValueRef.current !== selectedCategoryId) {
          setValue(newValue);
          prevValueRef.current = selectedCategoryId; // อัปเดตค่าเก่า
        }
        setOpen(false);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Subcategory</span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? filteredSubcategories.find(
                    (subcategory) => subcategory.id.toString() === value
                  )?.name
                : "Select subcategory..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white">
            <Command>
              <CommandInput placeholder="Search subcategory..." />
              <CommandList>
                <CommandEmpty>No subcategory found.</CommandEmpty>
                <CommandGroup>
                  {filteredSubcategories.map((subcategory) => (
                    <CommandItem
                      key={subcategory.id}
                      value={subcategory.name}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === subcategory.id.toString()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {subcategory.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

SelecSubCategoryProduct.displayName = "Selector";

export default SelecSubCategoryProduct;
