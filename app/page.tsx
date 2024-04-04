import WrapperContext from "@/components/Context";
import Navbar from "@/components/Navbar";
import TableUI from "@/components/TableUI";
import { column } from "@/components/columndef";
import ModalForm from "@/components/modal/Form";
import MessageBox from "@/components/modal/Message";
// import { data } from "@/data/data";
import { getUsers } from "./actions/server";
export default async function Home() {
  const data = await getUsers();
  return (
    <main className="min-h-screen mx-auto bg-slate-100/50">
      <WrapperContext>
        <Navbar />
        <div className="max-w-screen-xl mx-auto px-4 xl:p-0">
          <TableUI Columns={column} data={data.data} />
        </div>
        <ModalForm />
        <MessageBox />
      </WrapperContext>
    </main>
  );
}
