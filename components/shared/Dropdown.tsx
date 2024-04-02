import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   createCategory,
   getAllCategories,
} from "@/lib/actions/category.action";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";

type DropdownProps = {
   onChangeHandler: () => void;
   value: string;
};
export const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
   const [categories, setCategory] = useState<ICategory[]>([]);
   const [newCategory, setNewCategory] = useState<string>("");

   const handleAddCategory = () => {
      createCategory({
         categoryName: newCategory.trim(),
      }).then((category) => {
         setCategory([...categories, category]);
      });
   };

   useEffect(() => {
      const fetchCategories = async () => {
         const categoriesList = await getAllCategories();
         categoriesList && setCategory(categoriesList as ICategory[]);
      };

      fetchCategories();
   }, []);

   return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
         <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
         </SelectTrigger>
         <SelectContent>
            {categories.length > 0 &&
               categories.map((category) => (
                  <SelectItem
                     key={category._id}
                     value={category._id}
                     className="select-item p-regular-14"
                  >
                     {category.name}
                  </SelectItem>
               ))}
            <AlertDialog>
               <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
                  Add new category
               </AlertDialogTrigger>
               <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                     <AlertDialogTitle>New Category</AlertDialogTitle>
                     <AlertDialogDescription>
                        <Input
                           type="text"
                           placeholder="Category name"
                           className="input-field mt-3"
                           onChange={(e) => setNewCategory(e.target.value)}
                        />
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel>Cancel</AlertDialogCancel>
                     <AlertDialogAction
                        onClick={() => startTransition(handleAddCategory)}
                     >
                        Add
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </SelectContent>
      </Select>
   );
};
