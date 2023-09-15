type ErrorAlertProps = {
  alertText: string;
  alertType: "success" | "warning";
  extraClass?: string;
};

const ErrorAlert = ({ alertText, alertType, extraClass }: ErrorAlertProps) => {
  return (
    <div
      className={`${
        alertType === "success"
          ? "p-4 text-sm max-sm:w-[100%] absolute w-max text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-600"
          : "flex justify-center p-4 mb-4 max-sm:w-[100%] w-[285px] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      } ${extraClass}`}
    >
      <p>{alertText}</p>
    </div>
  );
};

export default ErrorAlert;
