export default function MobileButton(props) {
  const { mobileMenuFolded } = props;
  if (mobileMenuFolded) {
    return (
      <svg
        {...props}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 5H16M4 10H16M4 15H16"
          stroke="#1B202C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5H16M10 10H16M10 15H16"
        stroke="#1B202C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
