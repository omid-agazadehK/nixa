type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
};

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-fg-muted">{title}</p>

        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
          <Icon className="w-4 h-4 text-fg-muted" />
        </div>
      </div>

      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
