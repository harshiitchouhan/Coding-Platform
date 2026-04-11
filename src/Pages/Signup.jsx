import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(3, "Min Length Shd Be 3").max(15, "Max Length Shd Be 15"),
    email: z.email("Invalid Email"),
    password: z.string().min(5, "Min 5 chars").max(12, "Max 12 chars"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

function Signup() {
  const form = useForm({resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",email: "",password: "",confirm: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE - FORM */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          <h1 className="text-2xl font-bold mb-6 text-center">
            Create an Account
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Sign Up
              </Button>

            </form>
          </Form>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="signup"
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  );
}

export default Signup;