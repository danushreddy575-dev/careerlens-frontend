export default function ErrorBox({
  message
}) {
  return (
    <p className="error">
      {message}
    </p>
  );
}