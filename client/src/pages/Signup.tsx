import React from 'react'
import './pageStyles/grid.css'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

function Signup() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password: "",
        },
      });
    
      // 2. Define a submit handler.
      function hanldeSignup(values: z.infer<typeof formSchema>) {
        console.log(values);
      }
  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex flex-col justify-center items-center">
      <div className="__form_container w-[400px] bg-black border-[1px] py-10 rounded-md px-10 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h1 className="font-mono text-4xl font-bold text-left ">Login</h1>
          <p className="font-mono text-sx">Join the community of expert frontend developers. </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(hanldeSignup)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email " {...field} />
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
              Signup
            </Button>
          </form>
        </Form>
        <small className='font-mono text-xs'>
            Already have an account ? <Link to="/login" className='text-blue-500'>Login</Link>
        </small>
      </div>
    </div>
  )
}

export default Signup