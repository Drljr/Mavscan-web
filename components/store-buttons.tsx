type StoreButtonsProps = {
  className?: string;
};

export function StoreButtons({ className = "" }: StoreButtonsProps) {
  return (
    <div className={`inline-flex flex-wrap overflow-hidden rounded-[20px] border-[2px] border-dashed border-[#1D2D4D] p-1 gap-[8px] ${className}`}>
      <button type="button" className="flex grow items-center justify-center whitespace-nowrap gap-[10px] rounded-[12px] bg-[#F3F7F8] w-auto px-[24px] h-[48px] text-[16px] font-semibold leading-[100%] tracking-[-3%] text-[#0B142D]">
        <svg width="20" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12.864 3.649C13.67 2.66 14.247 1.297 14.101 0C12.927 0.048 11.504 0.78 10.675 1.77C9.937 2.63 9.286 4.016 9.456 5.266C10.766 5.36 12.036 4.638 12.864 3.649Z" fill="#0B142D" />
          <path d="M17.88 15.705C17.359 16.893 17.108 17.422 16.435 18.46C15.495 19.921 14.167 21.741 12.515 21.753C11.046 21.768 10.668 20.797 8.671 20.809C6.674 20.821 6.257 21.771 4.787 21.757C3.134 21.741 1.876 20.1 0.935 18.64C-1.693 14.569 -1.965 9.786 -0.345 7.314C0.808 5.54 2.63 4.501 4.341 4.501C6.086 4.501 7.185 5.472 8.649 5.472C10.067 5.472 10.93 4.5 12.945 4.5C14.466 4.5 16.078 5.331 17.231 6.766C13.47 8.944 14.08 14.29 17.88 15.705Z" fill="#0B142D" />
        </svg>
        <span>Get on iPhone</span>
      </button>
      <button type="button" className="flex grow items-center justify-center whitespace-nowrap gap-[8px] rounded-[12px] bg-[#0F0F10] w-auto px-[24px] h-[48px] text-[16px] font-semibold leading-[100%] tracking-[-3%] text-[#F3F7F8]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 2.5L14.182 12L3 21.5V2.5Z" fill="#34A853" />
          <path d="M14.182 12L18.09 8.679L6.478 1.94C5.67 1.471 4.66 1.834 4.33 2.664L14.182 12Z" fill="#FBBC04" />
          <path d="M14.182 12L4.33 21.336C4.66 22.166 5.67 22.529 6.478 22.06L18.09 15.321L14.182 12Z" fill="#EA4335" />
          <path d="M18.09 8.679L14.182 12L18.09 15.321L21.732 13.206C22.756 12.611 22.756 11.389 21.732 10.794L18.09 8.679Z" fill="#4285F4" />
        </svg>
        <span>Get on Android</span>
      </button>
    </div>
  );
}
