import { waLink } from "../components/site";

export default function ChdCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="relative overflow-hidden rounded-[28px] bg-zinc-900 text-white px-7 py-10 md:p-12 text-center">
        <div className="dotted-bg absolute inset-0 opacity-10" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-56 w-[36rem] bg-amber-400/20 blur-3xl rounded-full" />
        <div className="relative">
          <p className="font-hand text-2xl text-amber-300">deadline close? we have got you ✍️</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">Get your Chandigarh assignment done tonight.</h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-300">Message your college + subject now. Free sample + exact quote in 5 minutes. PDF tonight, spiral at your gate tomorrow.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <a href={waLink("Hi StudySathi Chandigarh! I want to order. College: ___, Subject: ___, Pages: ___, Deadline: ___")} className="rounded-full bg-emerald-500 px-8 py-3.5 font-bold hover:bg-emerald-400">💬 WhatsApp to order</a>
            <a href="tel:+919876543210" className="rounded-full border-2 border-white/30 px-8 py-3 font-bold hover:bg-white hover:text-zinc-900">📞 Call Tricity helpline</a>
          </div>
          <p className="mt-5 text-[12px] text-zinc-400">Pickup: Sector 17E & 34A • 9am–9pm • Cash / UPI on delivery in Chandigarh</p>
        </div>
      </div>
      <footer className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-zinc-500 pb-6">
        <p><strong className="text-zinc-800">StudySathi Chandigarh</strong> • PU • DAV • PEC • CU • IGNOU Sec-9 • Tricity delivery</p>
        <p className="flex gap-4"><a href="/" className="hover:underline">← All-India site</a><a href="#colleges" className="hover:underline">Colleges</a><a href="#pricing" className="hover:underline">Pricing</a></p>
      </footer>
      <a href={waLink("Hi StudySathi Chandigarh! I need help with: ___")} className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-2xl shadow-xl hover:scale-105 transition" aria-label="Chat on WhatsApp">💬</a>
    </section>
  );
}
