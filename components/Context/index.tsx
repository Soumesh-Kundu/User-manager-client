"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../columndef";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
type ContextType = {
  isFormOpen: boolean;
  setFormOpen: (open: boolean) => void;
  data: Omit<User, "sno" > & {type:"add"|"edit"} | null;
  setFormData: (user?: Omit<User, "sno" > | undefined) => void;
  isMessageOpen:{type:"delete"|"send"|null,isOpen:boolean,handle:()=>any|null},
  setMessageOpen:(open:{type:"delete"|"send"|null,isOpen:boolean,handle:()=>any})=>void
};
const Wrapper = createContext<ContextType | null>(null);
export default function WrapperContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [isMessageOpen, setMessageOpen] = useState<{type:"delete"|"send"|null,isOpen:boolean,handle:()=>any}>({type:null,isOpen:false,handle:()=>{}});
  const [data, setData] = useState<Omit<User, "sno"   > & {type:"add"|"edit"} | null>(null);
  function setFormData(input?: Omit<User, "sno" >) {
    if (!input) {
      setData({
        _id:"",
        name: "",
        email: "",
        phone: null,
        hobbies: [],
        type:'add'
      });
      return;
    }
    setData({
      ...input,
      type:"edit"
    });
  }
  useEffect(() => {
    async function getLoaders() {
      const { tailChase,ring,bouncy } = await import("ldrs");
      tailChase.register();
      ring.register()
      bouncy.register()
    }
    getLoaders()
  }, []);
  return (
    <>
      <Wrapper.Provider value={{ isFormOpen,isMessageOpen,setMessageOpen, setFormOpen, data, setFormData }}>
        {children}
        <ToastContainer
        position="bottom-right"
        theme="colored"
        />
      </Wrapper.Provider>
    </>
  );
}
export function useFormContext(): ContextType {
  return useContext(Wrapper) as ContextType;
}
