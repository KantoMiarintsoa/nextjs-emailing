import { MailIcon, SendIcon } from 'lucide-react';
import Link from 'next/link';

export default function Topbar() {
  return (
    <div className="w-full bg-gray shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold"></div>
      <div className="flex gap-4">
        <Link href="/sendEmail">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition cursor-pointer">
            <SendIcon size={18} />
            Envoyer Email
          </button>
        </Link>
        <Link href="/contact">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition cursor-pointer">
            <MailIcon size={18} />
            Contact Form
          </button>
        </Link>
      </div>
    </div>
  );
}

