export default function ActionButton({
  link
}) {

  const getSafeLink = () => {
    if (!link) return "";

    try {
      const cleaned =
        String(link)
          .trim()
          .replace(/[)\].,;!?]+$/g, "");

      const url = new URL(cleaned);

      if (
        !["http:", "https:"]
          .includes(url.protocol)
      ) {
        return "";
      }

      return url.href;
    } catch (err) {
      return "";
    }
  };

  const handleClick = () => {

    const safeLink =
      getSafeLink();

    if (safeLink) {

    window.open(
        safeLink,
        "_blank",
        "noopener,noreferrer"
    );

    } else {

    alert(
        link
          ? "This saved link is invalid. Please resync Gmail to refresh the opportunity link."
          : "Review Email feature coming soon"
    );

    }

  };

  return (

    <button
      className="btn btn-secondary"
      onClick={handleClick}
    >

      {
        link
          ? "Open Opportunity"
          : "Review Email"
      }

    </button>

  );

}
