interface DemoFrameProps {
  title: string;
  embedUrl: string;
}

export function DemoFrame({ title, embedUrl }: DemoFrameProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <iframe
        src={embedUrl}
        title={title}
        className="h-[min(80vh,720px)] w-full"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
      />
    </div>
  );
}
