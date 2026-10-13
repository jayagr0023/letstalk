export default function Message({ mine, avatar, children, time, read }) {
  if (mine) {
    return (
      <div className="ml-auto flex max-w-[78%] flex-col items-end">
        <p className="rounded-2xl rounded-br-md bg-teal-300 px-4 py-3 text-md leading-6 text-slate-950 shadow-lg shadow-teal-900/20">{children}<span className="-mb-1 px-1 text-[10px] text-slate-500">{time}{read ? " · Read" : ""}</span></p>
        
      </div>
    );
  }

  return (
    <div className="flex max-w-[78%] items-end gap-2">
      <img src={avatar} className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-300 text-[9px] font-bold text-slate-900"/>
      <div>
        <p className="rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-4 py-3 text-md leading-6 text-slate-200">{children}<span className="mt-1 px-1 text-[10px] text-slate-500">{time}</span></p>
        
      </div>
    </div>
  );
}