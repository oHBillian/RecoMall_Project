// "use client";
// import React, { memo, useCallback, useEffect, useState } from "react";
// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { useDispatch } from "react-redux";
// import { setIdCategory } from "@/lib/slices/subCategoryValue";
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/store";

// interface Selectorprops {
//   data: {
//     id: number;
//     name: string;
//   }[];
//   defaultSelected?: number;
// }
// const SelectorEdit: React.FC<Selectorprops> = memo(({ data,defaultSelected  }: Selectorprops) => {
//   // const categoryId = useSelector((state: RootState) => (state.subcategory.id));
//   // console.log("selector", data);

//   const [value, setValue] = useState("");
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (defaultSelected !== undefined) {
//       const defaultCategory = data.find((category) => category.id === defaultSelected);
//       if (defaultCategory) {
//         setValue(defaultCategory.id.toString());
//         dispatch(setIdCategory(defaultCategory.id));
//       }
//     }
//   }, [defaultSelected, data, dispatch]);


//   const handleSelect = useCallback(
//     (currentValue: string) => {
//       const selectedCategory = data.find(
//         (category) => category.name === currentValue
//       );

//       if (selectedCategory) {
//         if (value !== selectedCategory.id.toString()) {
//           setValue(selectedCategory.id.toString());
//           dispatch(setIdCategory(selectedCategory.id));
//           console.log("Selected ID:", selectedCategory.id);
//         }
//       }

//       setOpen(false);
//     },
//     [data, value, dispatch]
//   );
//   return (
//     <div className="flex flex-col gap-2">
//       <span className="font-semibold">Category name</span>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-[200px] justify-between"
//           >
//             {value
//               ? data.find((category) => category.id.toString() === value)?.name
//               : "Select framework..."}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[200px] p-0 bg-white">
//           <Command>
//             <CommandInput placeholder="Search framework..." />
//             <CommandList>
//               <CommandEmpty>No framework found.</CommandEmpty>
//               <CommandGroup>
//                 {data.map((category) => (
//                   <CommandItem
//                     key={category.id}
//                     value={category.name}
//                     onSelect={handleSelect}
//                     // onSelect={(currentValue) => {
//                     //   setValue(currentValue === value ? "" : currentValue)
//                     //   setOpen(false)
//                     // }}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         value === category.id.toString()
//                           ? "opacity-100"
//                           : "opacity-0"
//                       )}
//                     />
//                     {category.name}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// });

// SelectorEdit.displayName = "Selector";

// export default SelectorEdit;
