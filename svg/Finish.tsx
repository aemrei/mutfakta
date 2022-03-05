type FinishProp = {
  className?: string;
};

export default function Finish({ className }: FinishProp): JSX.Element {
  return (
    <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0.611084V22.3889H1.80435V15.1296H19.8478V0.611084H0ZM1.80435 2.4259H4.51087V5.14812H7.21739V2.4259H9.92391V5.14812H12.6304V2.4259H15.337V5.14812H18.0435V7.87034H15.337V10.5926H18.0435V13.3148H15.337V10.5926H12.6304V13.3148H9.92391V10.5926H7.21739V13.3148H4.51087V10.5926H1.80435V7.87034H4.51087V5.14812H1.80435V2.4259ZM4.51087 7.87034V10.5926H7.21739V7.87034H4.51087ZM7.21739 7.87034H9.92391V5.14812H7.21739V7.87034ZM9.92391 7.87034V10.5926H12.6304V7.87034H9.92391ZM12.6304 7.87034H15.337V5.14812H12.6304V7.87034Z"
        fill="#FEF3C7"
      />
    </svg>
  );
}
