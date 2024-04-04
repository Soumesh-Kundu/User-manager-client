"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogFooter,
} from "../ui/dialog";
import { isMobilePhone } from "validator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormContext } from "../Context";
import { DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useEffect, useRef, useState } from "react";
import { addUsers, updateUsers } from "@/app/actions/server";
import { User } from "../columndef";
import { toast } from "react-toastify";
const formSchema = z.object({
  _id: z.string(),
  name: z.string().min(5,{message:"Name should be at least 5 characters"}).max(50),
  email: z.string().email({message:"Email is not valid"}),
  phone: z.string().min(2,{message:"Phone Number is Required"}).refine(isMobilePhone,{message:"Not a valid Mobile number"}),
  hobbies: z.string().min(1,{message:"This field can't be empty"}).max(50),
});
export default function ModalForm() {
  const { isFormOpen, data ,setFormOpen} = useFormContext();
  const [isLoading,setLoading]=useState<boolean>(false)
  const ContentRef=useRef<HTMLDivElement|null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      phone: data?.phone?.toString(),
      hobbies: data?.hobbies.join(", "),
    },
    values: {
      _id:data?._id as string,
      name: data?.name as string,
      email: data?.email as string,
      phone: data?.phone?.toString() as string,
      hobbies: data?.hobbies.join(", ") as string,
    },
  });
  useEffect(()=>{
    if(!isFormOpen){
      form.reset()
    }
  },[isFormOpen])
  async function onSubmit(inputs:{name:string,email:string,hobbies:string,phone:string,_id:string}) {
      setLoading(true)
      const caller=data?.type==="add"?addUsers:updateUsers
      if(!caller) return;
      const {success,status}=await caller({...inputs,sno:0,hobbies:inputs.hobbies.split(','),phone:parseInt(inputs.phone)})
      if(!success){
        const message=data?.type==="add"?status!==400?"Couldn't entry new data":"Entry with same email already exists":"Entry haven't saved"
        toast.error(message)
      }
      setFormOpen(false)
      setLoading(false)
      form.reset()
  }
  return (
    <Dialog open={isFormOpen}>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent className=" bg-white border-none rounded-md px-8 py-6 text-lg md:text-base scale-x-95 md:scale-100 w-full  sm:w-1/2 lg:w-1/3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-[100]" ref={ContentRef}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="number" className="appearance-none"{...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hobbies</FormLabel>
                      <FormDescription>
                        Hobbies should be seperated by "&#44;"s
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-end">
                  {!isLoading?<Button type="submit">
                    {
                      data?.type==="add"?"Add":"Save"
                    }
                  </Button>:
                  <Button type="submit" className="px-5 ">
                    <l-ring size={20} speed={1.6} stroke={2.5} color="white"></l-ring>
                  </Button>}
                </div>
              </form>
            </Form>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
