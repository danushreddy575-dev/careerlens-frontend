export default function ActionButton({
  link
}) {

  const handleClick = () => {

    if (link) {

    window.open(
        link,
        "_blank"
    );

    } else {

    alert(
        "Review Email feature coming soon"
    );

    }

  };

  return (

    <button
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