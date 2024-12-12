"use client";

import { useRouter } from "next/navigation";

import { SearchSchema } from "@/constants/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SearchField = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SearchSchema>) {
    router.push(`/search?q=${encodeURIComponent(values.search)}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search" autoComplete="off" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button size={"icon"} type="submit" className="hidden sm:flex">
          <Search />
        </Button>
      </form>
    </Form>
  );
};
export default SearchField;
