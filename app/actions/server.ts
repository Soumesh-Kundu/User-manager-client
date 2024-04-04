"use server";
import { User } from "@/components/columndef";
import { revalidatePath } from "next/cache";
export async function getUsers() {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/user`, {
            method: "GET",
        });
        if(!res.ok){
          console.log(res)
          return {success:false,data:[]}
        }
        const { data } = (await res.json()) as { data: User[] };
        return {success:true, data};
    } catch (error) {
        console.log(error)
        return {success:false,data:[]}
    }
}

export async function addUsers(input: Omit<User, "_id" | "sno">):Promise<{success:boolean,status:number}> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/user/add`, {
      method: "POST",
      headers:{
        'Content-type':"application/json"
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      return { success: false,status:res.status };
    }
    revalidatePath('/')
    return { success: true ,status:res.status };
  } catch (error) {
    console.log(error)
    return {success:false ,status:500}
  }
}
export async function updateUsers(input: User) {
  try {
    console.log(input)
    const res = await fetch(`${process.env.BASE_URL}/api/user/update/${input._id}`, {
      method: "PUT",
      headers:{
        'Content-type':"application/json"
      },
      body: JSON.stringify({...input,sno:undefined}) ,
    });
    if (!res.ok) {
      return { success: false ,status:res.status};
    }
    revalidatePath('/')
    return { success: true,status:res.status };
  } catch (error) {
    console.log(error)
    return {success:false,status:500}
  }
}
export async function removeUsers(input: string[]) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/user/remove`, {
      method: "DELETE",
      headers:{
        'Content-type':"application/json"
      },
      body: JSON.stringify({ids:input}),
    });
    if (!res.ok) {
      return { success: false };
    }
    revalidatePath('/')
    return { success: true };
  } catch (error) {
    console.log(error)
    return {success:false}
  }
}
export async function sendUsers(input: string[]) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/send`, {
      method: "POST",
      headers:{
        'Content-type':"application/json"
      },
      body: JSON.stringify({ids:input}),
    });
    if (!res.ok) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.log(error)
    return {success:false}
  }
}
