"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RegisterUserSchema } from "@/lib/validations/user.schema";
import { RegisterUserInput } from "@/lib/validations/user.schema";
import Link from "next/link";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterUserInput> = async (data) => {
    const toastId = toast.loading("trying to register");
    try {
      setLoading(true);
      const res = await fetch(`/api/register`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res?.ok) {
        reset();
        const data = await res.json();
        toast.success(data.status as string);
        const toastId = toast.loading("Redirecting...");
        toast.dismiss(toastId);
        router.push("/login");
      } else if (res.status === 409) {
        const toastId = toast.loading("Checking...");
        toast.dismiss(toastId);
        toast.error("User with that email already exists", {
          duration: 4000,
        });
      } else if (res.status === 400) {
        toast.error("failed validations", {
          duration: 4000,
        });
      }
      console.log(res);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-auto h-screen  ">
      <h1 className=" text-2xl  font-black ">JWT register user</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:max-w-md md:max-w-xl max-w-max p-2 bg-white/90 rounded-[3px] shadow-lg shadow-gray-400 md:p-4  "
      >
        <div className="  min-w-3xl flex flex-col gap-6 w-full  mb-6 ">
          {/* username */}
          <div className="w-full min-w-[100%] ">
            <label className="label ">Username</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Username"
              className="form form-control rounded-md shadow-sm"
            />
            <p className="error">{errors.name?.message}</p>
          </div>
          {/* email */}
          <div className="w-full min-w-[100%]">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="abc@gmail.com"
              className="form form-control rounded-md shadow-sm"
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          {/* password */}
          <div className="w-full min-w-[100%]">
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="form form-control rounded-md shadow-sm"
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          {/* confirm  password */}
          <div className="w-full min-w-[100%]">
            <label className="label">Confirm password</label>
            <input
              type="password"
              {...register("passwordConfirm")}
              placeholder="Password"
              className="form form-control rounded-md shadow-sm"
            />
            <p className="error">{errors.passwordConfirm?.message}</p>
          </div>
        </div>
        <button type="submit" className="btn ">
          Register
        </button>
        <div className=" pt-[20px]  mx-auto text-center  my-2 w-fit m-4 justify-center items-center content-center justify-items-center ">
          <div className="">
            <span className="text-center  mx-auto  ">
              Already have an account?
              <Link href="/login" className="cursor-pointer hover:underline underline-offset-1 decoration-black/50">
                <strong className="ml-[2px]">Go to Login</strong>
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
