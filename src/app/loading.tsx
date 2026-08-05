export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50/50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
          Loading KodeToCareer...
        </p>
      </div>
    </div>
  );
}
