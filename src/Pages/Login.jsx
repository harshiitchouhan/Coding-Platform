import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../Features/authSlice";
import { useEffect } from "react";
import { Link } from "react-router";

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

const formSchema = z
  .object({
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Min 5 charachters").max(20, "Max 20 chars"),
  })



function Login (){


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state)=>state.auth);

    useEffect(()=>{
      if(isAuthenticated){
        navigate("/")  // this navigate is diff from routing one
      }
    },[isAuthenticated])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirm: "",
        },
      });
    
      function onSubmit(data) {
        dispatch(loginUser(data));
      }

    return(
        <>
        <div className="min-h-screen w-full relative bg-black overflow-hidden">
        
          {/* X-style top glow background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.28), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(56, 189, 248, 0.22), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(99, 102, 241, 0.12), transparent 60%), #000000",
            }}
          />
        
          {/* Soft floating blur layer (adds depth) */}
          <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_45%)]" />
        
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen">
        
                  {/* GLASS CARD */}
              <div className="w-full max-w-md rounded-2xl p-8 
                bg-white/10 backdrop-blur-xl 
                border border-white/20 
                shadow-2xl text-white">
        
                <div className="text-center space-y-2 mb-6">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome Back
                    </h1>

                    <p className="text-base text-muted-foreground">
                        Sign in to continue your coding journey
                    </p>
                </div>
        
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pl-1">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter email"
                              {...field}
                               className={`bg-white/10 h-10 border-white/20 text-white placeholder:text-gray-300
                                ${
                                  form.formState.errors.email
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : form.formState.touchedFields.email
                                    ? "border-green-500 focus-visible:ring-green-500"
                                    : ""
                                }
                              `} />
                          </FormControl>
                          <FormMessage name = "email" />
                        </FormItem>
                      )}
                    />
        
                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pl-1">Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter password"
                              {...field}
                              className={`bg-white/10 h-10 border-white/20 text-white placeholder:text-gray-300
                                ${
                                  form.formState.errors.password
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : form.formState.touchedFields.password
                                    ? "border-green-500 focus-visible:ring-green-500"
                                    : ""
                                }
                              `} 
        
                            />
                          </FormControl>
                          <FormMessage name = "password" />
                        </FormItem>
                      )}
                    />


            <Button
                type="submit"
                className="w-full h-12 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-lg transition-colors"> 
                Login   
            </Button> 

            <div className="text-center text-sm text-gray-300">
                <span className="pr-2">Don't have an Account</span>
                
                <Link to="/signup" className="text-blue-500 hover:text-blue-300 font-medium transition">
                  Sign Up
                </Link>
            </div>    

                </form>
                </Form>
              </div>
            </div>

          </div>

        </>
    )

}

export default Login;