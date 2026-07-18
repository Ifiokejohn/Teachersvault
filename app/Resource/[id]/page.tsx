export default function ResourcePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Resource ID: {params.id}</h1>
    </div>
  );
}
