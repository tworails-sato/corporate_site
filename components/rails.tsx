export function Rails({ long = false }: { long?: boolean }) {
  return (
    <span className={`rails${long ? " rails--long" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}
