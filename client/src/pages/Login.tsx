import React from "react";
import "./pageStyles/grid.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

function Login() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function hanldeLogin(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex flex-col justify-center items-center">
      <div className="__form_container w-[400px] bg-black border-[1px] py-10 rounded-md px-10 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h1 className=" font-mono text-4xl font-bold text-left ">Login</h1>
          <p className="font-mono text-xs">Welcome back fellow Coder </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(hanldeLogin)} className="space-y-8">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username or Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <small className='font-mono text-xs'>
            Don't have an account ? <Link to="/signup" className='text-blue-500'>Signup</Link>
        </small>
      </div>
    </div>
  );
}

export default Login;
