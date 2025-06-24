import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-[87px] mb-16">
          {/* Logo and Subscribe */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center">
                <span className="font-inter font-bold text-[24px] leading-none tracking-[0.03em] text-white">
                  Exclusive
                </span>
              </Link>
              <h3 className="font-poppins font-medium text-xl">Subscribe</h3>
            </div>
            <p className="font-poppins text-base">
              Get 10% off your first order
            </p>
            <div className="flex items-center border border-white rounded-md pl-4 pr-3 py-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full font-poppins text-base"
              />
              <button type="submit" className="ml-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12L22 2L12 22L9 13L2 12Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-6">
            <h3 className="font-poppins font-medium text-xl">Support</h3>
            <div className="flex flex-col gap-4">
              <p className="font-poppins text-base max-w-[175px]">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
              </p>
              <p className="font-poppins text-base">exclusive@gmail.com</p>
              <p className="font-poppins text-base">+88015-88888-9999</p>
            </div>
          </div>

          {/* Account */}
          <div className="flex flex-col gap-6">
            <h3 className="font-poppins font-medium text-xl">Account</h3>
            <div className="flex flex-col gap-4">
              <Link
                href="/account"
                className="font-poppins text-base hover:underline"
              >
                My Account
              </Link>
              <Link
                href="/auth/login"
                className="font-poppins text-base hover:underline"
              >
                Login / Register
              </Link>
              <Link
                href="/cart"
                className="font-poppins text-base hover:underline"
              >
                Cart
              </Link>
              <Link
                href="/wishlist"
                className="font-poppins text-base hover:underline"
              >
                Wishlist
              </Link>
              <Link
                href="/shop"
                className="font-poppins text-base hover:underline"
              >
                Shop
              </Link>
            </div>
          </div>

          {/* Quick Link */}
          <div className="flex flex-col gap-6">
            <h3 className="font-poppins font-medium text-xl">Quick Link</h3>
            <div className="flex flex-col gap-4">
              <Link
                href="/privacy-policy"
                className="font-poppins text-base hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-poppins text-base hover:underline"
              >
                Terms Of Use
              </Link>
              <Link
                href="/faq"
                className="font-poppins text-base hover:underline"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="font-poppins text-base hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Download App */}
          <div className="flex flex-col gap-6">
            <h3 className="font-poppins font-medium text-xl">Download App</h3>
            <div className="flex flex-col gap-2">
              <p className="font-poppins font-medium text-xs text-white/70">
                Save $3 with App New User Only
              </p>
              <div className="flex items-center gap-2">
                {/* QR Code */}
                <div className="w-20 h-20 border-2 border-white rounded-lg flex items-center justify-center bg-black">
                  {/* Placeholder for QR code */}
                  <div className="w-[76px] h-[76px] bg-gray-800 flex items-center justify-center">
                    <span className="text-xs text-center">QR Code</span>
                  </div>
                </div>
                {/* App Store Buttons */}
                <div className="flex flex-col gap-1">
                  <div className="w-[110px] h-10 border border-white/60 rounded flex items-center justify-center bg-black">
                    <span className="text-xs">Google Play</span>
                  </div>
                  <div className="w-[110px] h-10 border border-white/60 rounded flex items-center justify-center bg-black">
                    <span className="text-xs">App Store</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex gap-6 mt-2">
              <Link
                href="#"
                className="w-6 h-6 flex items-center justify-center"
              >
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.065 17.9972V9.80115H8.83L9.241 6.59215H6.065V4.54815C6.065 3.62215 6.323 2.98815 7.652 2.98815H9.336V0.12715C8.517 0.03915 7.693 -0.00285 6.869 0.00015C4.425 0.00015 2.747 1.49215 2.747 4.23115V6.58615H0V9.79515H2.753V17.9972H6.065Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-6 h-6 flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 2.17221C19.2645 2.49888 18.4641 2.72221 17.6397 2.82555C18.4956 2.33021 19.1366 1.55888 19.4424 0.637546C18.6392 1.09755 17.7593 1.42888 16.8417 1.60888C16.0942 0.830213 15.0277 0.333546 13.8461 0.333546C11.5803 0.333546 9.74366 2.16888 9.74366 4.41288C9.74366 4.73421 9.77683 5.04621 9.85021 5.34355C6.44004 5.17221 3.41643 3.5562 1.39275 1.06221C1.03982 1.67555 0.835461 2.37221 0.835461 3.12021C0.835461 4.52555 1.56107 5.76221 2.66275 6.47488C1.99028 6.46021 1.35718 6.27755 0.804122 5.98288C0.804122 5.99755 0.804122 6.01488 0.804122 6.03221C0.804122 8.00355 2.21854 9.63555 4.09763 10.0116C3.75865 10.1036 3.3889 10.1489 3.00473 10.1489C2.74366 10.1489 2.48259 10.1276 2.23596 10.0729C2.75865 11.6756 4.27107 12.8476 6.07412 12.8836C4.67031 13.9649 2.90107 14.6122 0.978885 14.6122C0.645969 14.6122 0.32 14.5956 0 14.5502C1.82519 15.7122 3.97336 16.3676 6.28977 16.3676C13.8348 16.3676 17.9632 10.2156 17.9632 4.91021C17.9632 4.73421 17.9575 4.56355 17.9489 4.39555C18.7646 3.82488 19.4424 3.11488 20 2.30488V2.17221Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-6 h-6 flex items-center justify-center"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 4.38159C6.44785 4.38159 4.38159 6.44785 4.38159 9C4.38159 11.5522 6.44785 13.6184 9 13.6184C11.5522 13.6184 13.6184 11.5522 13.6184 9C13.6184 6.44785 11.5522 4.38159 9 4.38159ZM9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9C12 10.6569 10.6569 12 9 12Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13.8 4.19998C14.4627 4.19998 15 3.66268 15 2.99998C15 2.33728 14.4627 1.79998 13.8 1.79998C13.1373 1.79998 12.6 2.33728 12.6 2.99998C12.6 3.66268 13.1373 4.19998 13.8 4.19998Z"
                    fill="white"
                  />
                  <path
                    d="M16.2 0H1.8C0.8055 0 0 0.8055 0 1.8V16.2C0 17.1945 0.8055 18 1.8 18H16.2C17.1945 18 18 17.1945 18 16.2V1.8C18 0.8055 17.1945 0 16.2 0ZM16.2 16.2H1.8V1.8H16.2V16.2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-6 h-6 flex items-center justify-center"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.01709 16.5H0.296875V5.49609H4.01709V16.5ZM2.15515 3.99414C0.964355 3.99414 0 3.02979 0 1.83899C8.53333e-09 1.35068 0.193646 0.882493 0.538338 0.53789C0.883031 0.193286 1.35132 -0.000244141 1.83975 -0.000244141C2.32819 -0.000244141 2.79648 0.193286 3.14117 0.53789C3.48586 0.882493 3.67951 1.35068 3.67951 1.83899C3.67951 3.02979 2.71494 3.99414 2.15515 3.99414ZM16.5 16.5H12.7866V11.1357C12.7866 9.85547 12.7652 8.19727 10.9897 8.19727C9.19287 8.19727 8.91455 9.58887 8.91455 11.0254V16.5H5.19775V5.49609H8.76318V7.00195H8.80981C9.2946 6.1416 10.4053 5.2373 12.0547 5.2373C15.8235 5.2373 16.5 7.53711 16.5 10.5469V16.5Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/40 pt-4 opacity-40 flex justify-center">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="8.33333"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M12.5 8.33333C12.5 7.44928 12.1488 6.60143 11.5237 5.97631C10.8986 5.35119 10.0507 5 9.16667 5C8.28262 5 7.43478 5.35119 6.80965 5.97631C6.18453 6.60143 5.83333 7.44928 5.83333 8.33333"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <p className="font-poppins text-base text-white">
              Copyright Rimel 2022. All right reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
