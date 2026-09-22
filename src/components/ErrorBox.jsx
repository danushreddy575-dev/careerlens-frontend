export default function ErrorBox({
  message
}) {
  return (
    <p className="error notice">
      {message}
    </p>
  );
}
