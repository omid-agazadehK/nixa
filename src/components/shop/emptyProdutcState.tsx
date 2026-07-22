export default function EmptyProductState() {
  return (
    <div className="flex flex-col items-center col-span-6 justify-center py-16 text-center">
      <p className="text-lg font-medium text-gray-600">No products found.</p>
      <p className="mt-1 text-sm text-gray-400">
        Try adjusting your search or filter to find what you&apos;re looking
        for.
      </p>
    </div>
  );
}
