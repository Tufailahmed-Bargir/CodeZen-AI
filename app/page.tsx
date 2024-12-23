import { redirect } from "next/navigation";

// async function getSession() {
//   return session;
// }
export default async function Page() {

  // const session = await getSession();
  if(true) {

    return redirect("/dashboard");
  }else {
    return redirect("/login");
  }

};

 
