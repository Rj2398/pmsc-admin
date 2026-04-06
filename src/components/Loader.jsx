export const Loader = ({ size = "md", overlay = false, visible }) => {
  if (!visible) return null;

  // Determine size class
  const sizeClass =
    size === "lg" ? "loader-lg" : size === "sm" ? "loader-sm" : "loader";

  const loaderHtml = <div style={{zIndex:'999999999 !important'}} className={sizeClass}></div>;

  // If overlay is true, wrap it in the full-screen dim container
  if (overlay) {
    return <div className="loader-overlay">{loaderHtml}</div>;
  }

  return loaderHtml;
};
