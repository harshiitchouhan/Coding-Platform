import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch , useSelector } from "react-redux";
import { loginUser } from "../Redux/Features/Auth/authSlice";
import { Link, useNavigate } from "react-router";

import { Eye, EyeOff,Mail } from 'lucide-react';
import { useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

const formSchema = z
  .object({
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Min 8 charachters").max(20, "Max 20 chars"),
  })



function Login (){


  const dispatch = useDispatch();
  const {error} = useSelector((state)=>state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

    // useEffect(()=>{
    //   if(isAuthenticated){
    //     navigate("/")  // this navigate is diff from routing one
    //   }
    // },[isAuthenticated])
    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
        mode: "onSubmit",
      });
    
      async function onSubmit(data) {
        
        const result = await dispatch(loginUser(data));

          if (loginUser.rejected.match(result)) {

            if (result.payload?.isVerified === false) {

              navigate("/verify-email", {
                state: {
                  email: result.payload.email,
                },
              });

            }
        }}

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
                          <div className="relative">
                            <Input
                              placeholder="Enter email"
                              {...field}
                              className={`bg-white/10 h-10 pr-12 border-white/20 text-white placeholder:text-gray-300
                                [-webkit-text-fill-color:white]
                                [transition:background-color_9999s_ease-in-out_0s]
                                ${
                                  form.formState.errors.email
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : form.formState.touchedFields.email
                                    ? "border-green-500 focus-visible:ring-green-500"
                                    : ""
                                }
                              `}
                            />

                            <div
                              className="absolute right-3 top-1/2 -translate-y-1/2
                              text-white/40 hover:text-white 
                              bg-white/5 hover:bg-white/10  p-1.5 rounded-md"
                            >
                              <Mail className="h-4 w-4" />
                            </div>
                          </div>
                        </FormControl>

                        <FormMessage name="email" />
                      </FormItem>
                    )}
                  />
        
                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-2">
                            <FormLabel className="pl-1">
                              Password
                            </FormLabel>

                            <Link
                              to="/forget-password"
                              className="text-sm text-blue-500 font-medium hover:text-blue-300"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                            <FormControl>
                            <div className="relative">

                              
                              
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                {...field}
                                className={`bg-white/10 h-10 border-white/20 text-white placeholder:text-gray-300 pr-10
                                  [-webkit-text-fill-color:white]
                                  [transition:background-color_9999s_ease-in-out_0s]
                                  ${
                                    form.formState.errors.password
                                      ? "border-red-500 focus-visible:ring-red-500"
                                      : form.formState.touchedFields.password
                                      ? "border-green-500 focus-visible:ring-green-500"
                                      : ""
                                  }
                                `}
                              />

                              

                              {/* Eye Icon */}
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 
                                          text-white/40 hover:text-white 
                                          bg-white/5 hover:bg-white/10 
                                          p-1.5 rounded-md 
                                          transition-all duration-200"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>

                            </div>
                          </FormControl>
                          <FormMessage name = "password" />
                        </FormItem>
                      )}
                    />

            
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            <Button
                type="submit"
                className="w-full h-12 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-base transition-colors"> 
                Login   
            </Button> 
            
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10"></div>

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10"></div>
            </div>


            <Button
              type="button"
              onClick={() => {
                  window.location.href =
                  import.meta.env.VITE_BACKEND_URL + "/auth/google";
              }}
              className="w-full h-12 text-base bg-[#0000005c] border-white/10 hover:bg-white/10 text-white flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303C33.659 32.657 29.239 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.219 0-9.626-3.327-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.571-.001-.001-.002-.001-.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>

              <span>Sign in with Google</span>
            </Button>
            
            <div className="text-center text-sm text-gray-300">
                <span className="pr-2">Don't have an Account?</span>
                
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