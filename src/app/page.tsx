import ContactForm from "@/components/ContactForm";
import SimpleEmailing from "@/components/SimpleEmailing";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 gap-4">
      <SimpleEmailing/>
      <ContactForm/>
    </div>
  );
}
