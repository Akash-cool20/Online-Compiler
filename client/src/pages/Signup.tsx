import React from 'react'
import './pageStyles/grid.css'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '@/utils/handleError';
import { useSignupMutation } from '@/redux/slices/api';
import { useDispatch } from 'react-redux';
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/appSlice';

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

function Signup() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
    const [signup, {isLoading}] = useSignupMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password: "",
        },
      });

      async function hanldeSignup(values: z.infer<typeof formSchema>) {
        try {
          console.log("singup values",values);
          const response = await signup(values).unwrap();
          dispatch(updateCurrentUser(response));
          dispatch(updateIsLoggedIn(true));
          navigate("/");
        } catch (error) {
          handleError(error)
        }
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
                    <Input disabled={isLoading} placeholder="Username " {...field} />
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
                    <Input disabled={isLoading} type="email" placeholder="Email " {...field} />
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
                    <Input disabled={isLoading} type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} className="w-full" type="submit">
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